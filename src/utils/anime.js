import anime from "animejs";
import { useLanguageStore } from "@/store/useLanguageStore";

export function animateSlide(el, moveEl, direction, page) {
  const elWidth = moveEl.value.offsetWidth;
  const offset = () => {
    if (page === 1) return 0;
    if (page === 2) return -elWidth;
    if (page === 3) return -elWidth * 2;
  };
  const moveOffset = direction < 0 ? offset() + elWidth : offset() - elWidth;
  
  anime({
    targets: `.${el}`,
    translateX: [offset(), moveOffset], // 음수 왼족, 양수 오른쪽 
    easing: 'easeOutExpo',
    duration: 1000, 
  })
}


export function animateLanguage(worldClass, languageClass, callback) {
  const store = useLanguageStore();

  const worldAnim = anime({
    targets: `.${worldClass}`,
    translateX: store.isLanguage ? [28, 0] : [0, 28],
    easing: "linear",
    duration: 200,
  });
  const languageAnim = anime({
    targets: `.${languageClass}`,
    translateX: store.isLanguage ? [-24, 0] : [0, -24],
    easing: "linear",
    duration: 200,
    complete: callback,
  });

  toggle(worldAnim, languageAnim);
}

function toggle(worldAnim, languageAnim) {
  if (worldAnim.began) {
    worldAnim.reverse();
    languageAnim.reverse();

    if (worldAnim.progress === 100 && worldAnim.direction === "reverse") {
      worldAnim.completed = false;
      languageAnim.completed = false;
    }
  }

  if (worldAnim.paused) {
    worldAnim.play();
    languageAnim.play();
  }
}