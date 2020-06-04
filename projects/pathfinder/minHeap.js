class MinHeap {
    constructor() {
        this.heap = [];
    }

    swap(index1, index2) {
        let temp = this.heap[index2];
        this.heap[index2] = this.heap[index1];
        this.heap[index1] = temp;
    }

    getParentIndex(childIndex) {
        return Math.floor((childIndex-1)/2); 
    }

    getLeftChildIndex(parentIndex) {
        return 2 * parentIndex + 1;
    }

    getRightChildIndex(parentIndex)  {
        return 2 * parentIndex + 2;
    }

    hasParent(index) {
        return this.getParentIndex(index) >= 0;
    }

    hasLeftChild(index) {
        return this.getLeftChildIndex(index) < this.heap.length;
    }

    hasRightChild(index) {
        return this.getRightChildIndex(index) < this.heap.length;
    }

    parent(index) {
        return this.heap[this.getParentIndex(index)];
    }

    leftChild(index) {
        return this.heap[this.getLeftChildIndex(index)];
    }

    rightChild(index) {
        return this.heap[this.getRightChildIndex(index)];
    }

    bubbleup() {
        let index = this.heap.length - 1;
        while(this.hasParent(index) && this.parent(index).f >= this.heap[index].f && this.parent(index).h >= this.heap[index].h) {
            if(this.parent(index).f == this.heap[index].f) {
                if (this.parent(index).h >= this.heap[index].h) {
                    this.swap(this.getParentIndex(index), index);
                    index = this.getParentIndex(index);
                }
            } else {
                this.swap(this.getParentIndex(index), index);
                index = this.getParentIndex(index);
            }
            // this.printHeap();
        }

    }

    bubbledown() {
        let index = 0;
        while(this.hasLeftChild(index)) {
            let smallerChildIndex = this.getLeftChildIndex(index);
            if (this.hasRightChild(index) && this.rightChild(index).f < this.leftChild(index).f) {
                smallerChildIndex = this.getRightChildIndex(index);
            }
            if (this.heap[index].f < this.heap[smallerChildIndex].f) {
                break;
            }
            else {
                this.swap(index, smallerChildIndex);
            }
            index = smallerChildIndex;
        }
    }

    insert(element) {
        this.heap.push(element);
        this.bubbleup();
    }

    removeMin() {
        let min;
        if (this.heap.length > 1) {
            min = this.heap[0];
            this.heap[0] = this.heap.pop();
            this.bubbledown();
        }
        else {
            min = this.heap.pop();
        }
        return min;
    }

    peek() {
        if (this.heap.length !== 0) {
            return this.heap[0];
        }
    }

    printHeap() {
        
        let index = 0;
        let count = 1;
        while(this.heap.length > index) {
            let arr = [];
            for (let i = 0; i < count; i++) {
                if (this.heap.length > index) {
                    arr.push(this.heap[index].f)
                    index++;
                }
            }
            console.log(arr);
            count *= 2;
        }       
    
    }

   

}