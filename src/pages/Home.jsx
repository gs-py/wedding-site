import Hero from '../components/home/Hero.jsx';
import Countdown from '../components/home/Countdown.jsx';
import CoupleNote from '../components/home/CoupleNote.jsx';
import WelcomeMessage from '../components/home/WelcomeMessage.jsx';

export default function Home() {
  return (
    <>
      <Hero />
      <Countdown />
      <CoupleNote />
      <WelcomeMessage />
    </>
  );
}
