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
      <div className="flex space-x-2 mt-4">
        <Input name="email" placeholder="Email" type="email"/>
        <Button type="submit">Send Invite</Button>
      </div>
    </form>
  )
}
