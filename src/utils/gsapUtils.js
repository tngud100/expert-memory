import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const XdirectfadeIn = (element, duration = null, delay) => {
  gsap.fromTo(element, { opacity: 0, x:50 }, { opacity: 1, x:0, duration: duration || 1, delay: delay });
}

export const YdirectfadeIn = (element, duration = null, delay) => {
  gsap.fromTo(element, { opacity: 0, y:50 }, { opacity: 1, y:0, duration: duration || 1, delay: delay });
}

export const fadeInElements = (startEl, animeElList, x = null, y = null, delay = 0, duration = 1, offset = 80, delayGap = 0.2) => {
  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: startEl,
      start: `top ${offset}%`,
      toggleActions: 'play none none none',
    }
  });

  for (let i = 0; i < animeElList.length; i++) {
    if(x){
      tl.fromTo(animeElList[i],
        { opacity: 0, x: x },
        { opacity: 1, x: 0, duration: duration, delay: delay }, `start`
      );
    } else if (y) {
      tl.fromTo(animeElList[i],
        { opacity: 0, y: y },
        { opacity: 1, y: 0, duration: duration, delay: delay }, `start`
      );
    } else {
      tl.fromTo(animeElList[i],
        { opacity: 0 },
        { opacity: 1, duration: duration, delay: delay }, `start`
      );
    }
    delay += delayGap;
  }
}

export const letterSpaceScaleFadeIn = (element, duration = null, delay) => {
  gsap.fromTo(element,
    {  letterSpacing: '40px', fontSize: '80px', opacity: 0 },
    {
      opacity: 1,
      fontSize: '60px',
      letterSpacing: '0px',
      duration: duration || 1,
      delay: delay,
      ease: 'power2.out'
    });
}
export const mobileLetterSpaceScaleFadeIn = (element, duration = null, delay) => {
  gsap.fromTo(element,
    {  letterSpacing: '10px', fontSize: '40px', opacity: 0 },
    {
      opacity: 1,
      fontSize: '30px',
      letterSpacing: '0px',
      duration: duration || 1,
      delay: delay,
      ease: 'power2.out'
    });
}