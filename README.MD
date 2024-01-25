type Mask = string
type MutableMaskPart = 0
type MutableReplaceChar = string / Это нужно чтобы вместо 0 подставлять знак
например в Mask = "996000" и MutableReplaceChar = "\_"  мы будем показывать "996\_\_\_"


Илим! как протестировать? 
Ответ - В корне проекта запускаешь npm run build. Появится папка dist и там будет файл bundle.js. Создаешь любой html файл и 
подключаешь bundle.js/ в html файле дплжен быть инпут с айди input
вот и все