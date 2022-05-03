// Создаем видеоплеер в модальном окне
export default class VideoPlayer {
    constructor(triggers, overlay) {
        this.btns = document.querySelectorAll(triggers);
        this.overlay = document.querySelector(overlay);
        this.close = this.overlay.querySelector('.close');
    }

    // Перебираем кнопки и назначаем слушатель клика
    // Если уже есть именно тег iframe с id frame, то показываем его,
    // иначе в переменную path помещаем data атрибут кнопки(ссылку на видео) и вызываем метод createPlayer
    bindTriggers() {
        this.btns.forEach(btn => {
            btn.addEventListener('click', () => {
                if (document.querySelector('iframe#frame')) {
                    this.overlay.style.display = 'flex';
                } else {
                    const path = btn.getAttribute('data-url');
                    this.createPlayer(path);
                }
            });
        });
    }

    // При клике на крестик в модальном окне с видео скрываем модальное окно и останавливаем видео
    bindCloseBtn() {
        this.close.addEventListener('click', () => {
            this.overlay.style.display = 'none';
            this.player.stopVideo();
        });
    }

    // Создаем новый экземпляр класса YT с настройками(высота, ширина, id видео), который заменяет блок с id frame,
    // показываем модальное окно
    createPlayer(url) {
        this.player = new YT.Player('frame', {
            height: '100%',
            width: '100%',
            videoId: `${url}`,
          });

          this.overlay.style.display = 'flex';
    }

    init() {
        // Программно подключаем YouTube API к верстке
        const tag = document.createElement('script');
        tag.src = "https://www.youtube.com/iframe_api";
         
        const firstScriptTag = document.getElementsByTagName('script')[0];
        firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

        // Биндим кнопки
        this.bindTriggers();
        this.bindCloseBtn();
    }
}