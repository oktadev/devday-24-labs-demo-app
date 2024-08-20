'use client';

import { useToast } from '@/components/ui/use-toast'
import { Button } from '@/components/ui/button'
import { Course } from '@/data/models'
import { useRouter } from 'next/navigation'
import { enrollToCourse } from '@/app/actions'

type Props = {
  course: Course;
}

export default function EnrollButton({ course }: Props) {
  const { toast } = useToast();
  const router = useRouter();

  return (
    <Button onClick={async () => {
      const result = await enrollToCourse(course.slug)
      
      if (result.success) {
        toast({
          title: result.message,
        });
      } else {
        toast({
          title: result.message,
          description: "This message is to ensure we are properly validating the user session on the server side and not only on the front end.",
          variant: 'destructive',
        });
      }
    }}>
      Enroll
    </Button>
  )
}
