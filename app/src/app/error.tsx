'use client' // Error boundaries must be Client Components
 
import { Button } from '@/components/ui/button';

interface ErrorProps {
  error: Error & { digest?: string }
  reset: () => void
}
export default function Error(props: ErrorProps) {
  const { reset } = props;
 
  return (
    
    <div className="flex flex-col items-center justify-center min-h-screen font-[family-name:var(--font-geist-sans)]">
      <h2 className="text-2xl font-bold">Something went wrong!</h2>
      <Button variant='secondary' onClick={() => reset()}>Try again</Button>
    </div>
  )
}