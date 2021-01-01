var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var blocksContainer = document.querySelector('.blocks');
var toggleButton = document.querySelector('#start');
var blocks = [];
var running = false;
function setUp() {
    var existingBlocksString = localStorage.getItem('blocks');
    var existingBlocks = existingBlocksString ? JSON.parse(existingBlocksString) : [];
    for (var i = 0; i < 25; i++) {
        var blockDiv = document.createElement('div');
        blockDiv.className = 'block';
        var num = void 0;
        num = existingBlocks.length > 0 ? existingBlocks[i] : 0;
        blockDiv.innerHTML = num + '';
        blockDiv.style.backgroundColor = getColor(num);
        blocks.push(blockDiv);
        blocksContainer.appendChild(blockDiv);
    }
    updateLocalStorage();
    toggleButton.addEventListener('click', toggle);
    document.querySelector('#reset').addEventListener('click', reset);
}
function reset() {
    localStorage.removeItem('blocks');
    blocks = [];
    blocksContainer.innerHTML = '';
    setUp();
}
function delay(fn) {
    var _this = this;
    return new Promise(function (resolve) {
        setTimeout(function () { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, fn()];
                    case 1:
                        _a.sent();
                        resolve();
                        return [2 /*return*/];
                }
            });
        }); }, 10);
    });
}
function toggle() {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (running) {
                        toggleButton.innerHTML = 'Start';
                    }
                    else {
                        toggleButton.innerHTML = 'Stop';
                    }
                    running = !running;
                    _a.label = 1;
                case 1:
                    if (!running) return [3 /*break*/, 3];
                    return [4 /*yield*/, delay(modifyRandomBlock)];
                case 2:
                    _a.sent();
                    updateLocalStorage();
                    return [3 /*break*/, 1];
                case 3: return [2 /*return*/];
            }
        });
    });
}
function modifyRandomBlock() {
    return __awaiter(this, void 0, void 0, function () {
        var index, block, mutator, currentNum, nextNum;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    index = Math.floor(Math.random() * blocks.length);
                    block = blocks[index];
                    mutator = Math.floor(Math.random() * 21) - 10;
                    currentNum = parseInt(block.innerHTML);
                    nextNum = currentNum + mutator;
                    block.innerHTML = nextNum + '';
                    block.style.backgroundColor = getColor(nextNum);
                    if (!(mutator < 0)) return [3 /*break*/, 2];
                    return [4 /*yield*/, bubbleUp(index)];
                case 1:
                    _a.sent();
                    return [3 /*break*/, 4];
                case 2:
                    if (!(mutator > 0)) return [3 /*break*/, 4];
                    return [4 /*yield*/, bubbleDown(index)];
                case 3:
                    _a.sent();
                    _a.label = 4;
                case 4: return [2 /*return*/];
            }
        });
    });
}
function getColor(num) {
    var backgroundColorStyle;
    if (num < 0) {
        backgroundColorStyle = "rgb(0, 0, " + -3 * num + ")";
    }
    else if (num > 0) {
        backgroundColorStyle = "rgb(" + num * 3 + ", 0, 0)";
    }
    else {
        backgroundColorStyle = 'rgb(0, 0, 0)';
    }
    return backgroundColorStyle;
}
function bubbleUp(index) {
    return __awaiter(this, void 0, void 0, function () {
        var i, currentNum, keepBubbling, otherNum;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    i = index;
                    currentNum = parseInt(blocks[index].innerHTML);
                    keepBubbling = true;
                    _a.label = 1;
                case 1:
                    if (!keepBubbling) return [3 /*break*/, 5];
                    if (i === 0) {
                        keepBubbling = false;
                        return [3 /*break*/, 5];
                    }
                    otherNum = parseInt(blocks[i - 1].innerHTML);
                    if (!(currentNum < otherNum)) return [3 /*break*/, 3];
                    return [4 /*yield*/, delay(function () {
                            var temp = blocks[i - 1];
                            blocks[i - 1] = blocks[i];
                            blocks[i] = temp;
                            blocksContainer.replaceChild(blocks[i], blocks[i - 1]);
                            temp.before(blocks[i - 1]);
                            i--;
                        })];
                case 2:
                    _a.sent();
                    return [3 /*break*/, 4];
                case 3:
                    keepBubbling = false;
                    _a.label = 4;
                case 4: return [3 /*break*/, 1];
                case 5: return [2 /*return*/];
            }
        });
    });
}
function bubbleDown(index) {
    return __awaiter(this, void 0, void 0, function () {
        var i, currentNum, keepBubbling, otherNum;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    i = index;
                    currentNum = parseInt(blocks[index].innerHTML);
                    keepBubbling = true;
                    _a.label = 1;
                case 1:
                    if (!keepBubbling) return [3 /*break*/, 5];
                    if (i === blocks.length - 1) {
                        keepBubbling = false;
                        return [3 /*break*/, 5];
                    }
                    otherNum = parseInt(blocks[i + 1].innerHTML);
                    if (!(currentNum > otherNum)) return [3 /*break*/, 3];
                    return [4 /*yield*/, delay(function () {
                            var temp = blocks[i + 1];
                            blocks[i + 1] = blocks[i];
                            blocks[i] = temp;
                            blocksContainer.replaceChild(blocks[i], blocks[i + 1]);
                            temp.after(blocks[i + 1]);
                            i++;
                        })];
                case 2:
                    _a.sent();
                    return [3 /*break*/, 4];
                case 3:
                    keepBubbling = false;
                    _a.label = 4;
                case 4: return [3 /*break*/, 1];
                case 5: return [2 /*return*/];
            }
        });
    });
}
function updateLocalStorage() {
    localStorage.setItem('blocks', JSON.stringify(blocks.map(function (block) { return parseInt(block.innerHTML); })));
}
setUp();
//# sourceMappingURL=index.js.map