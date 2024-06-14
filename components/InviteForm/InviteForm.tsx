'use client'

import { sendInvite } from '@/app/actions'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { toast } from '@/components/ui/use-toast'
import { AlertCircle } from 'lucide-react'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'

export default function InviteForm() {
  return (
    <form action={async (data) => {
      const result = await sendInvite(data.get('email')?.toString() || '')
      toast({
        title: result.message,
        variant: result.success ? 'default' : 'destructive'
      });
    }}>
      <Alert variant="destructive">
        <AlertCircle className="h-4 w-4"/>
        <AlertTitle>Heads up!</AlertTitle>
        <AlertDescription>
          This method is not implemented, please visit the lab "Invite workflow using the Auth0 Organizations Invitation feature" to make this form work!
        </AlertDescription>
      </Alert>
      <div className="flex space-x-2 mt-4">
        <Input name="email" placeholder="Email" type="email"/>
        <Button type="submit">Send Invite</Button>
      </div>
    </form>
  )
}
