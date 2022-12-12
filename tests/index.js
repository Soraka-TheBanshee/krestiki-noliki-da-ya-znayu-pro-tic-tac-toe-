const myFunc = () => {
    console.log(this, 'inside myFunc');
}

function otherFunc(func) {
    console.log(this, 'inside otherFunc');

    func()
}


const myObject = {
    myMethod(items, func) {
        console.log(this, "inside object"); // logs myObject
        func() // logs myObjec
        items.forEach(() => {
            console.log(this, "inside callback");
        });
    }
};


const myNewObj = {
  someObj: {
    method: () => {
        console.log(this, 'insed method in myNewObj');
        const someCallbacl = () => {
            console.log(this, 'inside someCallback');
        }
        someCallbacl()
    },
    this: this
  }
}

const yetAnotherObj = Object.create(
    {},
    {
        this: this
    }
)

otherFunc.bind(yetAnotherObj)(myFunc)