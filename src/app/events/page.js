import React from 'react';
import EventCard from '@/app/events/eventcard/EventCard';
import Link from 'next/link';
import Footer from '@/components/common/footer/Footer';
import Slider from '@/components/common/EventBanner';

const Page = () => {
  return (
    <>
      <div className="h-auto w-screen">
        <div className="flex justify-center items-center mt-28">
          <h1 className="text-white text-3xl font-roboto font-bold md:text-9xl">
            EVENTS
          </h1>
        </div>
        <div className="md:mt-0 mt-10">
          <Slider />
        </div>
        <div className="md:grid md:grid-cols-4 md:mt-16 justify-items-center gap-6 flex flex-col justify-center items-center mt-20 mb-10">
          <Link href={'/eventregistration/registration/8ballpool'}>
            <EventCard
              imgUrl={'/EventPageImg/8ballpool.jpg'}
              eventName={'8 BALL POOL'}
              details={
                'Dive into the virtual realm of cues, balls, and pockets, and discover why millions of players choose 8 Ball Pool for endless fun and competitive challenges.'
              }
              closeEvent={"Registration is closed."}
            />
          </Link>
          <Link href={'/eventregistration/registration/bgmi'}>
            <EventCard
              imgUrl={'/EventPageImg/Bgmi.jpeg'}
              eventName={'BGMI'}
              details={
                'The ultimate mobile battleground awaits, where players unite, strategize, and engage in epic battles for victory. Join now!'
              }
              closeEvent={"Registration is closed."}
            />
          </Link>
          <Link href={'/eventregistration/registration/bishopbattle'}>
            <EventCard
              imgUrl={'/EventPageImg/Chess.jpeg'}
              eventName={'BISHOP BATTLE'}
              details={
                'Welcome to the world of chess, a timeless gamewhere strategy, foresight, and skill converge on the 64 squares.'
              }
              closeEvent={"Registration is closed."}
            />
          </Link>
          <Link href={'/eventregistration/registration/craftopia'}>
            <EventCard
              imgUrl={'/EventPageImg/craftopia.jpg'}
              eventName={'CRAFTOPIA'}
              details={
                'The Grand Handcraft Competition Celebrating Artistry, Imagination, and Skill - Unleash Your Creativity and Showcase Your Handmade Masterpieces!'
              }
              closeEvent={"Registration is closed."}
            />
          </Link>
          <Link href={'/eventregistration/registration/efootball'}>
            <EventCard
              imgUrl={'/EventPageImg/E football.jpeg'}
              eventName={'E-FOOTBALL'}
              details={
                'Merging the pitch and pixel, this game redefines soccer gaming with realism, community, and esports thrill. Presenting E-FOOTBALL!'
              }
              closeEvent={"Registration is closed."}
            />
          </Link>
          <Link href={'/eventregistration/registration/freezetheframe'}>
            <EventCard
              imgUrl={'/EventPageImg/Freeze the frame.jpg'}
              eventName={'FREEZZE THE FRAME'}
              details={
                'Get your lenses, cameras and phones out to capture and enhance what we see every day.Thy lens shall be our eyes!'
              }
              closeEvent={"Registration is closed."}
            />
          </Link>
          <Link href={'/eventregistration/registration/ideascape'}>
            <EventCard
              imgUrl={'/EventPageImg/ideascape.jpeg'}
              eventName={'IDEASCAPE'}
              details={
                'Fostering Innovation and Empowering Change: A Comprehensive Guide to Effective Idea Presentation for a Transformative Tomorrow.'
              }
              closeEvent={"Registration is closed."}
            />
          </Link>
          <Link href={'/eventregistration/registration/modeldisplay'}>
            <EventCard
              imgUrl={'/EventPageImg/model display.jpg'}
              eventName={'MODEL DISPLAY'}
              details={
                "Work on some real-time, innovative, model project ideas, and hang in there until you make the cut. When you display your own model, it'll be like earning a Merit Badge for your efforts!"
              }
              closeEvent={"Registration is closed."}
            />
          </Link>
          <Link href={'/eventregistration/registration/posterexhibition'}>
            <EventCard
              imgUrl={'/EventPageImg/Poster Exibhision.jpg'}
              eventName={'POSTER EXHIBITION'}
              details={
                "Let your mind wander, yet make a statement. Illustrate your thoughts, caption your voice, embolden your words - and there, you've made a poster.Express yourself, and display it."
              }
              closeEvent={"Registration is closed."}
            />
          </Link>
          <Link href={'/eventregistration/registration/roborampage'}>
            <EventCard
              imgUrl={'/EventPageImg/Robo Rampage.jpg'}
              eventName={'ROBO RAMPAGE'}
              details={
                'The ultimate mobile battleground awaits, where players unite, strategize, and engage in epic battles for victory. Join now!'
              }
              closeEvent={"Registration is closed."}
            />
          </Link>
          <Link href={'/eventregistration/registration/codegolf'}>
            <EventCard
              imgUrl={'/EventPageImg/Super Coder.jpg'}
              eventName={'SUPER CODER'}
              details={
                'How well is your Code Efficiency in terms of Code Shortening and Modifying? If juggling with varying code redundancy, length and dimension si your thing, then buddy,pick acode, trim it down!'
              }
              closeEvent={"Registration is closed."}
            />
          </Link>
          <Link href={'/eventregistration/registration/techtrivia'}>
            <EventCard
              imgUrl={'/EventPageImg/Tech Trivia.jpeg'}
              eventName={'TECH TRIVIA'}
              details={
                'Are you the Tech-nerd of your group? Do people mock you for your knowledge on tech stuff? Grab this opportunity to put your knowledge to the test, ace thisTech Quiz and gain admirers!'
              }
              closeEvent={"Registration is closed."}
            />
          </Link>
          <Link href={'/eventregistration/registration/treasurehunt'}>
            <EventCard
              imgUrl={'/EventPageImg/treasure hunt.jpg'}
              eventName={'TREASURE HUNT'}
              details={
                "Welcome, adventurers! Embark on a thrilling journey, solve clues, and unveil secrets in our exciting treasure hunt. Let's begin the quest!"
              }
              closeEvent={"Registration is closed."}
            />
          </Link>
          <Link href={'/eventregistration/registration/webdevelopment'}>
            <EventCard
              imgUrl={'/EventPageImg/web development.jpeg'}
              eventName={'WEB DEVELOPMENT'}
              details={
                'Showcase your creative talent of website development. Explore your ability to build excellent websites and impress everyone with your developing skills.'
              }
              closeEvent={"Registration is closed."}
            />
          </Link>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Page;
