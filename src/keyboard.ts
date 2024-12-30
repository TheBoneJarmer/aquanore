export enum Keys {
    Escape,
    Up,
    Down,
    Left,
    Right,
    Space,
    Enter,
    LeftShift,
    RightShift,
    LeftCtrl,
    RightCtrl,
    Tab,
    AltLeft,
    AltRight,
    Backspace,
    Home,
    End,
    Insert,
    Delete,
    PageUp,
    PageDown,
    A,
    B,
    C,
    D,
    E,
    F,
    G,
    H,
    I,
    J,
    K,
    L,
    M,
    N,
    O,
    P,
    Q,
    R,
    S,
    T,
    U,
    V,
    W,
    X,
    Y,
    Z,
    D1,
    D2,
    D3,
    D4,
    D5,
    D6,
    D7,
    D8,
    D9,
    D0,
    Minus,
    Equal,
    BracketLeft,
    BracketRight,
    Backslash,
    Slash,
    Comma,
    Period,
    Semicolon,
    Quote,
    Backquote,
    Numpad0,
    Numpad1,
    Numpad2,
    Numpad3,
    Numpad4,
    Numpad5,
    Numpad6,
    Numpad7,
    Numpad8,
    Numpad9,
    NumpadDivide,
    NumpadMultiply,
    NumpadSubtract,
    NumpadAdd,
    NumpadEnter,
    NumpadDecimal,
}

class KeyboardState {
    public code: string;
    public key: Keys;
    public value: number;

    public constructor(code: string, key: Keys) {
        this.code = code;
        this.key = key;
        this.value = 0;
    }
}

export class Keyboard {
    private static readonly _states: KeyboardState[] = [];

    public static init() {
        this.initStates();
        this.initListeners();
    }

    private static initListeners() {
        window.addEventListener("keydown", (e) => {
            const state = this.getStateByCode(e.code);

            if (state == null) {
                return;
            }

            if (state.value == 0) {
                state.value = 1;
            }
        });

        window.addEventListener("keyup", (e) => {
            const state = this.getStateByCode(e.code);

            if (state == null) {
                return;
            }

            state.value = 3;
        });
    }

    private static initStates() {
        this._states.push(new KeyboardState('ArrowUp', Keys.Up));
        this._states.push(new KeyboardState('ArrowDown', Keys.Down));
        this._states.push(new KeyboardState('ArrowLeft', Keys.Left));
        this._states.push(new KeyboardState('ArrowRight', Keys.Right));
        this._states.push(new KeyboardState('Space', Keys.Space));
        this._states.push(new KeyboardState('Enter', Keys.Enter));
        this._states.push(new KeyboardState('ShiftLeft', Keys.LeftShift));
        this._states.push(new KeyboardState('ShiftRight', Keys.RightShift));
        this._states.push(new KeyboardState('ControlLeft', Keys.LeftCtrl));
        this._states.push(new KeyboardState('ControlRight', Keys.RightCtrl));
        this._states.push(new KeyboardState('Tab', Keys.Tab));
        this._states.push(new KeyboardState('AltLeft', Keys.AltLeft));
        this._states.push(new KeyboardState('AltRight', Keys.AltRight));
        this._states.push(new KeyboardState('Escape', Keys.Escape));
        this._states.push(new KeyboardState('Backspace', Keys.Backspace));
        this._states.push(new KeyboardState('Home', Keys.Home));
        this._states.push(new KeyboardState('End', Keys.End));
        this._states.push(new KeyboardState('Delete', Keys.Delete));
        this._states.push(new KeyboardState('Insert', Keys.Insert));
        this._states.push(new KeyboardState('PageUp', Keys.PageUp));
        this._states.push(new KeyboardState('PageDown', Keys.PageDown));

        this._states.push(new KeyboardState('KeyA', Keys.A));
        this._states.push(new KeyboardState('KeyB', Keys.B));
        this._states.push(new KeyboardState('KeyC', Keys.C));
        this._states.push(new KeyboardState('KeyD', Keys.D));
        this._states.push(new KeyboardState('KeyE', Keys.E));
        this._states.push(new KeyboardState('KeyF', Keys.F));
        this._states.push(new KeyboardState('KeyG', Keys.G));
        this._states.push(new KeyboardState('KeyH', Keys.H));
        this._states.push(new KeyboardState('KeyI', Keys.I));
        this._states.push(new KeyboardState('KeyJ', Keys.J));
        this._states.push(new KeyboardState('KeyK', Keys.K));
        this._states.push(new KeyboardState('KeyL', Keys.L));
        this._states.push(new KeyboardState('KeyM', Keys.M));
        this._states.push(new KeyboardState('KeyN', Keys.N));
        this._states.push(new KeyboardState('KeyO', Keys.O));
        this._states.push(new KeyboardState('KeyP', Keys.P));
        this._states.push(new KeyboardState('KeyQ', Keys.Q));
        this._states.push(new KeyboardState('KeyR', Keys.R));
        this._states.push(new KeyboardState('KeyS', Keys.S));
        this._states.push(new KeyboardState('KeyT', Keys.T));
        this._states.push(new KeyboardState('KeyU', Keys.U));
        this._states.push(new KeyboardState('KeyV', Keys.V));
        this._states.push(new KeyboardState('KeyW', Keys.W));
        this._states.push(new KeyboardState('KeyX', Keys.X));
        this._states.push(new KeyboardState('KeyY', Keys.Y));
        this._states.push(new KeyboardState('KeyZ', Keys.Z));
        
        this._states.push(new KeyboardState('Digit0', Keys.D0));
        this._states.push(new KeyboardState('Digit1', Keys.D1));
        this._states.push(new KeyboardState('Digit2', Keys.D2));
        this._states.push(new KeyboardState('Digit3', Keys.D3));
        this._states.push(new KeyboardState('Digit4', Keys.D4));
        this._states.push(new KeyboardState('Digit5', Keys.D5));
        this._states.push(new KeyboardState('Digit6', Keys.D6));
        this._states.push(new KeyboardState('Digit7', Keys.D7));
        this._states.push(new KeyboardState('Digit8', Keys.D8));
        this._states.push(new KeyboardState('Digit9', Keys.D9));
        
        this._states.push(new KeyboardState('Minus', Keys.Minus));
        this._states.push(new KeyboardState('Equal', Keys.Equal));
        this._states.push(new KeyboardState('BracketLeft', Keys.BracketLeft));
        this._states.push(new KeyboardState('BracketRight', Keys.BracketRight));
        this._states.push(new KeyboardState('Backslash', Keys.Backslash));
        this._states.push(new KeyboardState('Slash', Keys.Slash));
        this._states.push(new KeyboardState('Period', Keys.Period));
        this._states.push(new KeyboardState('Comma', Keys.Comma));
        this._states.push(new KeyboardState('Semicolon', Keys.Semicolon));
        this._states.push(new KeyboardState('Backquote', Keys.Backquote));
        this._states.push(new KeyboardState('Quote', Keys.Quote));
        
        this._states.push(new KeyboardState('Numpad0', Keys.Numpad0));
        this._states.push(new KeyboardState('Numpad1', Keys.Numpad1));
        this._states.push(new KeyboardState('Numpad2', Keys.Numpad2));
        this._states.push(new KeyboardState('Numpad3', Keys.Numpad3));
        this._states.push(new KeyboardState('Numpad4', Keys.Numpad4));
        this._states.push(new KeyboardState('Numpad5', Keys.Numpad5));
        this._states.push(new KeyboardState('Numpad6', Keys.Numpad6));
        this._states.push(new KeyboardState('Numpad7', Keys.Numpad7));
        this._states.push(new KeyboardState('Numpad8', Keys.Numpad8));
        this._states.push(new KeyboardState('Numpad9', Keys.Numpad9));
        this._states.push(new KeyboardState('NumpadDivide', Keys.NumpadDivide));
        this._states.push(new KeyboardState('NumpadMultiply', Keys.NumpadMultiply));
        this._states.push(new KeyboardState('NumpadSubtract', Keys.NumpadSubtract));
        this._states.push(new KeyboardState('NumpadAdd', Keys.NumpadAdd));
        this._states.push(new KeyboardState('NumpadEnter', Keys.NumpadEnter));
        this._states.push(new KeyboardState('NumpadDecimal', Keys.NumpadDecimal));
    }

    public static update() {
        for (let i = 0; i < this._states.length; i++) {
            const state = this._states[i];

            if (state.value == 1) {
                this._states[i].value = 2;
            }

            if (state.value == 3) {
                this._states[i].value = 0;
            }
        }
    }

    public static keyDown(key: Keys) {
        const state = this.getStateByKey(key);

        if (state != null) {
            return state.value > 0;
        }

        return false;
    }

    public static keyUp(key: Keys) {
        const state = this.getStateByKey(key);

        if (state != null) {
            return state.value == 3;
        }

        return false;
    }

    public static keyPressed(key: Keys) {
        const state = this.getStateByKey(key);

        if (state != null) {
            return state.value == 1;
        }

        return false;
    }

    /* HELPER FUNCTIONS */
    private static getStateByKey(key: Keys): KeyboardState | null {
        for (let state of this._states) {
            if (state.key == key) {
                return state;
            }
        }

        return null;
    }

    private static getStateByCode(code: string): KeyboardState | null {
        for (let state of this._states) {
            if (state.code == code) {
                return state;
            }
        }

        return null;
    }
}
