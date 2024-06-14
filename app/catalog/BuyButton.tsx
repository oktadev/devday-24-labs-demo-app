'use client';

import { useToast } from '@/components/ui/use-toast'
import { Button } from '@/components/ui/button'
import { Course } from '@/data/models'
import { useRouter } from 'next/navigation'
import { buyCourse } from '@/app/actions'

type Props = {
  course: Course;
}

export default function BuyButton({ course }: Props) {
  const { toast } = useToast();
  const router = useRouter();

  return (
    <Button onClick={async () => {
      const result = await buyCourse(course.slug)
      if (result.success) {
        toast({
          title: result.message,
        });
        router.push(`/my-courses/${course.slug}`);
      } else {
        toast({
          title: result.message,
          description: "This message is to ensure we are properly validating the user session on the server side and not only on the front end.",
          variant: 'destructive',
        });
      }
    }}>
      Buy
    </Button>
  )
}
