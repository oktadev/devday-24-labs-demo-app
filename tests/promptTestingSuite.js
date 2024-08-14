const fs = require('fs');
const path = require('path');
const { MemoryVectorStore } = require("langchain/vectorstores/memory");
const { Document } = require("@langchain/core/documents");
const OpenAI = require("openai");

require('dotenv').config({ path: './.env' });

const PROMPTS_FILE = path.join(process.cwd(), 'tests', 'testPrompts.json');
const RESULTS_FILE = path.join(process.cwd(), 'tests', 'testResults.json');

const openai = process.env.OPENAI_API_KEY ? new OpenAI({ apiKey: process.env.OPENAI_API_KEY }) : null;

class DistilBERTEmbeddings {
  async embedDocuments(documents) {
    return documents.map(() => Array(768).fill(Math.random()));
  }

  async embedQuery(text) {
    return Array(768).fill(Math.random());
  }
}

async function setupVectorStore() {
  const embeddings = new DistilBERTEmbeddings();
  const vectorStore = new MemoryVectorStore(embeddings);
  const documents = [
    new Document({ pageContent: "Authentication verifies user identity.", metadata: { source: "https://auth0.com/docs/1" } }),
    new Document({ pageContent: "Authorization determines user access rights.", metadata: { source: "https://auth0.com/docs/2" } }),
    new Document({ pageContent: "Multi-factor authentication increases security.", metadata: { source: "https://auth0.com/docs/3" } }),
    new Document({ pageContent: "Single Sign-On allows access to multiple apps with one login.", metadata: { source: "https://auth0.com/docs/4" } }),
  ];
  await vectorStore.addDocuments(documents);
  return vectorStore;
}

async function getAIResponse(chat) {
  const vectorStore = await setupVectorStore();
  const userQuery = chat[chat.length - 1].content;
  const searchResults = await vectorStore.asRetriever({
    searchType: "mmr",
    searchKwargs: { fetchK: 3 },
    k: 2,
  }).getRelevantDocuments(userQuery);

  const numberedContext = searchResults.map((doc, index) => 
    `[${index + 1}] ${doc.pageContent}\nSource: ${doc.metadata.source}`
  ).join('\n\n');

  const systemMessage = {
    role: "system",
    content: `You are a chatbot that answers questions about identity, authentication, and authorization. Rules:
1. Use ONLY the information from the numbered context below.
2. Your response MUST be 50 words or less.
3. Cite sources using [1], [2], etc. after EACH piece of information.
4. If you can't answer using the context, try to provide a partial answer or related information.
5. Do not add any information not present in the context.
6. Your response MUST contain at least one citation in square brackets, like [1].

Context:

${numberedContext}

Remember to cite your sources and only use the information provided above.`,
  };

  const messages = [systemMessage, { role: "user", content: userQuery }];

  let assistantResponse;

  if (openai) {
    try {
      const completion = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        messages,
        max_tokens: 100,
        temperature: 0.4,
      });
      assistantResponse = completion.choices[0].message.content || "Error: No response generated";
    } catch (error) {
      console.error("Error using OpenAI:", error);
      throw new Error("An error occurred while generating the response with OpenAI.");
    }
  } else {
    try {
      const TransformersApi = Function('return import("@xenova/transformers")')();
      const { pipeline } = await TransformersApi;
      const textGenerator = await pipeline("text-generation", "Xenova/Qwen1.5-0.5B-Chat");
      const result = await textGenerator(messages, { 
        max_new_tokens: 100,
        do_sample: true,
        temperature: 0.4,
        top_p: 0.95,
        repetition_penalty: 1.2,
      });

      if (!Array.isArray(result) || result.length === 0 || !result[0].generated_text) {
        throw new Error("Error generating a response");
      }

      assistantResponse = Array.isArray(result[0].generated_text)
        ? result[0].generated_text.find(msg => msg.role === 'assistant')?.content || "Error: No assistant response found"
        : result[0].generated_text;
    } catch (error) {
      console.error("Error using Xenova/Transformers:", error);
      throw new Error("An error occurred while generating the response with Xenova/Transformers.");
    }
  }

  // Post-processing to include URLs in citations
  let processedResponse = assistantResponse.replace(/\[(\d+)\]/g, (match, p1) => {
    const index = parseInt(p1) - 1;
    return (index >= 0 && index < searchResults.length) 
      ? `[${p1}: ${searchResults[index].metadata.source}]`
      : match;
  });

  // Add a default citation if none are present
  if (!/\[(\d+):/.test(processedResponse)) {
    const defaultSource = searchResults[0]?.metadata.source || "https://auth0.com/docs";
    processedResponse += ` [1: ${defaultSource}] (Note: This citation was added automatically as the response lacked proper citations)`;
  }

  return processedResponse;
}

function evaluateResponse(actualOutput, expectedOutput, criteria) {
  const normalizeText = (text) => {
    return text.toLowerCase()
      .replace(/\b(the|a|an|and|or|but|in|on|at|to|for|of|with|by|from|up)\b/g, '')
      .replace(/[^\w\s\[\]]/g, '')
      .trim();
  };

  const normalizedActual = normalizeText(actualOutput);
  const normalizedExpected = normalizeText(expectedOutput);

  switch (criteria) {
    case 'exact':
      return normalizedActual === normalizedExpected;
    case 'contains':
      const keywords = normalizedExpected.split(/\s+/).filter(word => word.length > 3);
      const matchCount = keywords.filter(keyword => normalizedActual.includes(keyword)).length;
      return matchCount / keywords.length >= 0.7;
    case 'length':
      return actualOutput.split(/\s+/).length <= parseInt(expectedOutput);
    case 'citation':
      const openBrackets = (actualOutput.match(/\[/g) || []).length;
      const closeBrackets = (actualOutput.match(/\]/g) || []).length;
      return openBrackets > 0 && openBrackets === closeBrackets;
    default:
      return false;
  }
}

async function runTests() {
  try {
    const prompts = JSON.parse(fs.readFileSync(PROMPTS_FILE, 'utf8'));
    const results = [];

    for (const [index, prompt] of prompts.entries()) {
      console.log(`Running test ${index + 1}/${prompts.length}: ${prompt.name}`);

      const startTime = Date.now();
      const response = await getAIResponse([{ role: 'user', content: prompt.input }]);
      const endTime = Date.now();

      const result = {
        name: prompt.name,
        input: prompt.input,
        expectedOutput: prompt.expectedOutput,
        actualOutput: response,
        passed: evaluateResponse(response, prompt.expectedOutput, prompt.criteria),
        executionTime: endTime - startTime,
      };

      results.push(result);
      console.log(`Test ${index + 1} completed. Passed: ${result.passed}`);
    }

    fs.writeFileSync(RESULTS_FILE, JSON.stringify(results, null, 2));

    const passedTests = results.filter(r => r.passed).length;
    console.log(`\nTest Summary:`);
    console.log(`Total Tests: ${results.length}`);
    console.log(`Passed: ${passedTests}`);
    console.log(`Failed: ${results.length - passedTests}`);
    console.log(`\nDetailed results saved to ${RESULTS_FILE}`);
  } catch (error) {
    console.error("Error running tests:", error);
  }
}

runTests().catch(console.error);