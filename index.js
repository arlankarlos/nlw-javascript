const { select, input, checkbox } = require('@inquirer/prompts')
const fs = require("fs").promises

let mensagem = "Bem vindo ao app de metas.";


let metas

const carregarMetas = async () => {
	try {
		const metasSalvas = await fs.readFile("metas.json", "utf-8")
		metas = JSON.parse(metasSalvas)
	}
	catch (erro) {
		metas = []
		console.log("Erro ao carregar metas: ", erro)
	}
}

const salvarMetas = async () => {
	await fs.writeFile("metas.json", JSON.stringify(metas, null, 2))
}


const cadastrarMeta = async () => {
	const meta = await input({message: 'Digite a meta: '})

	if(meta.length == 0){
		mensagem = 'Meta não pode ser vazia.'
		return
	}

	metas.push(
		{value:meta, checked:false}
	)

	mensagem = "Meta cadastrada com sucesso!"
}

const listarMetas = async () => {
	if(metas.length == 0){
		mensagem = "Não existe meta!"
		return
	}
	const respostas = await checkbox({
		message: "Use as setas para mudar de meta, o espaço para marcar ou desmarcar e o Enter para finalizar essa etapa",
		choices: [...metas],
		instructions: false,
	})

	metas.forEach((metaTemp) => {
		metaTemp.checked = false
	})

	if(respostas.length == 0) {
		mensagem = 'Nenhuma meta selecionada!'
		return
	}

	respostas.forEach((resposta) => {
		const meta = metas.find((metaTemp) => {
			return metaTemp.value == resposta
		})

		meta.checked = true
	})

	mensagem = "Meta(s) concluída(s)"
}

const metasRealizadas = async () =>{
	if(metas.length == 0){
		mensagem = "Não existe meta!"
		return
	}	
	const realizadas = metas.filter((meta) => {
		return meta.checked
	})

	if(realizadas.length == 0){
		console.log("Não existem metas realizadas! :(")
		return
	}

	await select ({
		message: "Metas realizadas: " + realizadas.length + "\n",
		choices: [...realizadas]
	})
}

const metasAbertas = async () =>{
	if(metas.length == 0){
		mensagem = "Não existe meta!"
		return
	}
	const abertas = metas.filter((meta) => {
		return meta.checked != true
	})

	if(abertas.length == 0){
		mensagem = "Não existem metas abertas! :)"
		return
	}

	await select ({
		message: "Metas abertas: " + abertas.length + "\n",
		choices: [...abertas]
	})
}

const deletarMetas = async () => {
	if(metas.length == 0){
		mensagem = "Não existe meta!"
		return
	}
	const metasDesmarcadas = metas.map((meta) => {
		return {value: meta.value, checked: false}
	})
	const itemsADeletar = await checkbox({
		message: "Selecione meta para apagar",
		choices: [...metasDesmarcadas],
		instructions: false,
	})

	if(itemsADeletar.length == 0){
		mensagem = 'Nenhum item para apagar!'
		return
	}

	itemsADeletar.forEach((item) => {
		metas = metas.filter((metaTemp) => {
			return metaTemp.value != item
		})
	})
	mensagem = 'Meta(s) deletada(s) com sucesso!'

}

const mostrarMensagem = () => {
	console.clear();

	if(mensagem != ""){
		console.log(mensagem);
		console.log("")
		mensagem = ""
	}
}


const start = async () => {
	await carregarMetas()
    while(true){
		mostrarMensagem()
		await salvarMetas()
		const opcao = await select(
			{
				message: "Menu >",
				choices: [
					{
						name: 'Cadastrar Metas',
						value:'cadastrar'
					},
					{
						name: 'Listar Metas',
						value: 'listar'
					},
					{
						name: 'Metas realizadas',
						value: 'realizadas'
					},
					{
						name: 'Metas abertas',
						value: 'abertas'
					},
					{
						name: 'Deletar Metas',
						value: 'deletar'
					},
					{
						name: 'Sair',
						value:'sair'
					}
					]
				})

		switch (opcao) {
			case 'cadastrar':
				await cadastrarMeta()
				break
			case "listar":
				await listarMetas()
				break
			case 'realizadas':
				await metasRealizadas()
				break
			case 'abertas':
				await metasAbertas()
				break
			case 'deletar':
				await deletarMetas()
				break
			case "sair":
				console.log('Encerrado programa.')
				return
		}
	}
}

// start
start();