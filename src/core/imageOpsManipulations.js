let OPS_STACK = [];

export function op(type, payload, callback) {
    OPS_STACK.push({type: type, ...payload, callback: callback});

    if (OPS_STACK.length > 20) {
        OPS_STACK = OPS_STACK.slice(1, 21);
    }
}

export function undoLastOp() {
    const op = OPS_STACK.pop();
    op.callback(op.payload);
}