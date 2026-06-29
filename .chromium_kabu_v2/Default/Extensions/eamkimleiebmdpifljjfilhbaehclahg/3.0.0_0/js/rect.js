class Rect {
    left;
    top;
    right;
    bottom;
    width;
    height;
    constructor(left, top, width, height) {
        this.left = left;
        this.top = top;
        this.right = left + width;
        this.bottom = top + height;
        this.width = width;
        this.height = height;
    }
    transposed() {
        return new Rect(this.top, this.left, this.height, this.width);
    }
    contains(other) {
        return (other.left >= this.left &&
            other.right <= this.right &&
            other.top >= this.top &&
            other.bottom <= this.bottom);
    }
    horizontalMerge(other) {
        const A = this.transposed();
        const B = other.transposed();
        const X = A.verticalMerge(B);
        if (X === null) {
            return null;
        }
        return X.transposed();
    }
    verticalMerge(other) {
        let A = this;
        let B = other;
        // swap A and B if A is not on top
        if (this.top > other.top) {
            ;
            [A, B] = [B, A];
        }
        // if A is overlapping with B
        if (A.bottom >= B.top && A.bottom <= B.bottom) {
            return new Rect(A.left, A.top, A.right - A.left, B.bottom - A.top);
        }
        else {
            return null;
        }
    }
    merge(other) {
        let x, y, w, h;
        // same left and right
        if (this.left == other.left && this.right == other.right) {
            return this.verticalMerge(other);
            // same top and bottom
        }
        else if (this.top == other.top && this.bottom == other.bottom) {
            return this.horizontalMerge(other);
        }
        return null;
    }
    toString() {
        return `Rect(${this.width}x${this.height})@${this.left},${this.top}`;
    }
}
