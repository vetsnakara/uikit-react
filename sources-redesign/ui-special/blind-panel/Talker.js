(function () {
    const BlindTalker = function (options) {
        this.API_KEY = "307fd9d4-f5bf-4064-9a4c-587754d4e1c0";
        this.COOKIE_NAME = "lowVisHTML";
        this.STORAGE_KEY = "blind:talker:enable";
        this.NORMAL_THEME = "common";
        this.chach = {};
        this.lastText = null;
        this.immediatelyStop = false;
        this.isPlaying = false;
        this.isOpera = navigator.userAgent.indexOf("Opera") > -1;
        this.isBlindMode = false;
        this.isSoundDisabled = true;
        this.playerElement = null;
        this.playerElement = new Audio();
        this.playerElement.preload = "metadata";
        this.autoSound = options.autoSound || [];

        this.checkIsBlindModeEnabled();
        this.initHandlers();

        return this;
    };

    BlindTalker.prototype.initHandlers = function () {
        const self = this;
        let SelectionTimer = null;
        if (this.autoSound.length) {
            const selector = this.autoSound.join(", ");
            $(selector).on("mouseenter", function () {
                if (!self.isBlindMode || self.isSoundDisabled) {
                    return true;
                }
                self.play(!!!$(this).attr("title") ? $(this).text() : $(this).attr("title"));
            });

            $(selector).on("mouseleave", function () {
                if (!self.isBlindMode || self.isSoundDisabled) {
                    return true;
                }
                self.stop();
            });
        }

        document.addEventListener("selectionchange", () => {
            if (!self.isBlindMode || self.isSoundDisabled) {
                return true;
            }
            if (SelectionTimer) {
                clearTimeout(SelectionTimer);
            }
            setTimeout(function () {
                const selectedText = self.getSelectionText();
                if (selectedText) {
                    self.play(selectedText);
                }
            }, 2000);
        });
    };

    /**
     * Проверяет включен ли режим слабовидящих и активирована ли озвучка
     */
    BlindTalker.prototype.checkIsBlindModeEnabled = function () {
        const theme = this.getCookie(this.COOKIE_NAME);
        this.isBlindMode = theme && theme !== this.NORMAL_THEME;
        if (this.isBlindMode) {
            this.isSoundDisabled = !localStorage.getItem(this.STORAGE_KEY);
        } else {
            localStorage.removeItem(this.STORAGE_KEY);
        }
    };

    /**
     * Читает значение cookie
     * @param name
     * @return {string|undefined}
     */
    BlindTalker.prototype.getCookie = function (name) {
        let matches = document.cookie.match(
            new RegExp("(?:^|; )" + name.replace(/([.*+?\^${}()|\[\]\/\\])/g, "\\$1") + "=([^;]*)")
        );
        return matches ? decodeURIComponent(matches[1]) : undefined;
    };

    /**
     * Отключает озвучку
     */
    BlindTalker.prototype.disableSound = function () {
        if (this.isPlaying) {
            this.stop();
        }
        this.isSoundDisabled = true;
        localStorage.removeItem(this.STORAGE_KEY);
    };

    /**
     * Включает озвучку
     */
    BlindTalker.prototype.enableSound = function () {
        this.isSoundDisabled = false;
        this.isBlindMode = true;
        localStorage.setItem(this.STORAGE_KEY, "1");
    };

    /**
     * Запрашивает файл аудио текста и воспроизводит
     * @param {string} text - текст для озвучивания
     * @param {boolean?} cache - маркер того кешировать ли файл озвучки или нет, если не передан то кеширование отключено
     * @return {boolean}
     */
    BlindTalker.prototype.play = function (text, cache) {
        var self = this;
        var list = null;
        var cacheEnable = _.isUndefined(cache) ? false : cache;
        if ("undefined" == typeof text || !text.length || this.immediatelyStop) {
            this.immediatelyStop = false;
            return false;
        }
        if (this.isPlaying) {
            this.stop();
        }
        this.isPlaying = true;
        this.lastText = text;
        if (this.startPlayingTimeout) {
            clearTimeout(this.startPlayingTimeout);
            this.startPlayingTimeout = null;
        }
        list = this.breakLongText(text);
        $(this.playerElement)
            .off("ended")
            .on("ended", function () {
                if (list.length) {
                    console.log("воспроизвел звук");
                    if (cacheEnable) {
                        self.loadData(list.pop()).done(function (data) {
                            self.playerElement.src = URL.createObjectURL(data);
                            self.playerElement.play(0);
                        });
                    } else {
                        self.playerElement.src = list.shift();
                        self.playerElement.play(0);
                    }
                } else {
                    self.stop();
                    self.lastText = null;
                }
            });
        this.startPlayingTimeout = setTimeout(
            function (url) {
                console.log("воспроизвел звук");
                if (cacheEnable) {
                    self.loadData(url).done(function (data) {
                        self.playerElement.src = URL.createObjectURL(data);
                        self.playerElement.play(0);
                    });
                } else {
                    self.playerElement.src = url;
                    self.playerElement.play(0);
                }
            },
            300,
            list.shift()
        );
    };

    /**
     * Загружает данные и сохраняет в кеш или отдает из кеша если данные уже в нем сохранены.
     * @param url
     * @return {*}
     */
    BlindTalker.prototype.loadData = function (url) {
        const self = this;
        const d = $.Deferred();
        if (this.chach[url]) {
            return d.resolve(this.chach[url]);
        }
        $.ajax({
            url: url,
            processData: false,
            xhrFields: {
                responseType: "arraybuffer",
            },
            success: function (data) {
                self.chach[url] = new Blob([data]);
                d.resolve(new Blob([data]));
            },
        });
        return d.promise();
    };

    /**
     * Останавливает воспроизведение
     */
    BlindTalker.prototype.stop = function () {
        this.isPlaying = false;
        clearTimeout(this.startPlayingTimeout);
        this.startPlayingTimeout = null;
        this.playerElement.pause();
    };

    /**
     * Разрезает переданные текст на предложения с ограничением в 100 символов
     * @param {string} str - текст предназначенный для озвучивания
     * @return {*}
     */
    BlindTalker.prototype.breakLongText = function (str) {
        const self = this;
        const sentences = str.split(".").map(function (str) {
            return str.replace(/\s{2,}/gi, " ").split(" ");
        });

        return sentences.reduce(function (current, words) {
            let line = "";
            words.forEach(function (word) {
                if (line.length + word.length > 100) {
                    current.push(self.getQuery(line));
                    line = "";
                }
                if (word.trim().length) {
                    line += word + " ";
                }
            });
            if (line.length) {
                current.push(self.getQuery(line));
            }
            return current;
        }, []);
    };

    /**
     * Возвращает сроку запроса к api
     * @param {string} text - текст для озвучивания
     * @return {string}
     */
    BlindTalker.prototype.getQuery = function (text) {
        return (
            "https://tts.voicetech.yandex.net/generate?text=" +
            encodeURIComponent(text) +
            "&format=" +
            (this.isOpera ? "opus" : "mp3") +
            "&speaker=zahar&emotion=neutral&ill=false&robot=true&lang=ru-RU&key=" +
            this.API_KEY
        );
    };

    BlindTalker.prototype.getSelectionText = function () {
        let text = "";
        const activeEl = document.activeElement;
        const activeElTagName = activeEl ? activeEl.tagName.toLowerCase() : null;
        if (
            activeElTagName === "textarea" ||
            (activeElTagName === "input" &&
                /^(?:text|search|password|tel|url)$/i.test(activeEl.type) &&
                typeof activeEl.selectionStart == "number")
        ) {
            text = activeEl.value.slice(activeEl.selectionStart, activeEl.selectionEnd);
        } else if (window.getSelection) {
            text = window.getSelection().toString();
        }
        return text;
    };

    window.BlindTalker = BlindTalker;
})();
