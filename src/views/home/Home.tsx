import { useRouter } from '@tanstack/react-router';

export default function Home() {
  const router = useRouter();
  console.log(router);
  return <h1>Hello World: Home</h1>;
}
