// arrays, objetos
let metas = ['Aprender React', 'Aprender Redux', 'Aprender Node'];

// objeto
let meta = {
    meta1: 'Aprender React',
    meta2: 'Aprender Redux',
    meta3: 'Aprender Node',
    checked: false,
    isChecked: function() {
        return this.checked;
    },
    log: function(info) {
        console.log(info);
    }
};
console.log(metas[1] + " || " + metas[2]);
console.log(meta.meta1 + " || " + meta.meta2 + " || " + meta.checked);
console.log(meta.isChecked());

//manipulação de dados
meta.meta1 = 'Aprender React Native';
meta.log(meta.meta1);

// function // arrow function
const criarMeta = () => {}

function criarMeta2() {
    console.log('Criando meta');
}
criarMeta2();

let meta2 = {
    value: 'Aprender React',
    checked: true,
}

let metass = [
    meta2,
    {
        value: 'Aprender Redux',
        checked: true,
    }
]

console.log(metass[0].value);
console.log(metass[1].value);
console.log(meta2.value);