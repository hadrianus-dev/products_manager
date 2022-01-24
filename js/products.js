    // OBS: - AS FUNÇÕES ABAIXO CONTÉM EFEITOS COLATERAIS, 
    // SEJA LIVRE PARA REFATORAR SE QUISER
    
    let id = 1
    let editID = null
    const  arrayProduct = []


    /* Este método é responsével pela criação de botons dinámicamente */
    const makeButton = ( titleButton = '', stylesButton = [], attributes = null ) => {
        const btn = document.createElement('button')
        for (let i = 0; i < stylesButton.length; i++) {
            btn.classList.add(stylesButton[i])
        }
        btn.innerText = titleButton
        btn.setAttribute('id', titleButton)
        /* btn.setAttribute('onclick', 'deleteItem()') */
        btn.setAttribute
        return btn
    }

    /* Este método é responsável por fazer a limpeza de formulário */
    const cleanForm = () => {
        document.getElementById( 'productName' ).value  = ''
        document.getElementById( 'productPrice' ).value = '' 

        document.getElementById( 'btnId' ).innerText = 'Salvar'
        editID = null
    }

    /* Este método é responsável por fazer a listagem dos dados na tabela */
    const showListData = arrayProduct => {
        let tbody = document.getElementById('tbody')
        tbody.innerText = ''
        let td_id, td_productName, td_productPrice, td_action

        for (let i = 0; i < arrayProduct.length; i++) {
            let tr = tbody.insertRow();

            td_id = tr.insertCell()
            td_productName = tr.insertCell()
            td_productPrice = tr.insertCell()
            td_action = tr.insertCell()

            td_id.innerText = arrayProduct[i].id
            td_productName.innerText = arrayProduct[i].productName
            td_productPrice.innerText = arrayProduct[i].productPrice

            console.log('id:', arrayProduct[i].id);
            let btnEdit = makeButton( 'Editar', ['btn','btn-sm','btn-outline-primary'] )
            btnEdit.setAttribute( 'onclick', 'editItem('+ JSON.stringify(arrayProduct[i]) +')' )

            let btnDelete = makeButton( 'Deletar', ['btn','btn-sm','btn-outline-danger'] ) 
            btnDelete.setAttribute( 'onclick', 'deleteItem('+ arrayProduct[i].id +')' )

            td_action.appendChild( btnEdit )
            td_action.appendChild( btnDelete )

        }
    }

    /* Este método é responsável por pegar os dados do formulário */
    const getValidateInputs = () => {
        let msg = ''
        let products = {}
        
        if( ( document.getElementById( 'productName' ).value ) && ( document.getElementById( 'productPrice' ).value ) !== '' ) {
            products.id = id 
            products.productName = document.getElementById( 'productName' ).value 
            products.productPrice = document.getElementById( 'productPrice' ).value 
            return products
        }
            
        msg += 'Por favor, preencha todos os campos \n' 

        ( msg != '' ) ? alert( msg ) : msg
    }


    /* TRATANDO DOS DADOS: */

    /* Este método, é responsavel por fazer a adição dos dados no arrayProducts */
    const store = products => {
        (products) 
        ? ( ( arrayProduct.push( products ) ) ? id ++ : id = 1   ) 
        : false
        
        return arrayProduct
    }

    /* Este método é responsável por preparar o formulário para edição */
    const editItem = data => {
        editID = data.id
        document.getElementById( 'productName' ).value = data.productName
        document.getElementById( 'productPrice' ).value = data.productPrice
        document.getElementById( 'btnId' ).innerText = 'Atualizar'
    }

    /* Este método é responsável por atualizar os dados no arrayProduct */
    const update = id => {

        for (let i = 0; i < arrayProduct.length; i++) {
            if(arrayProduct[i].id === id) {
                arrayProduct[i].productName = document.getElementById( 'productName' ).value
                arrayProduct[i].productPrice = document.getElementById( 'productPrice' ).value
            }
        }
    }

    /* Este método faz a deleção de itens no arrayProduct */
    const deleteItem = id => {
        let tbody = document.getElementById('tbody')
        if( confirm( `Deseja realmente excluir o item -> ${id}` ) ){
            for ( let i = 0; i < arrayProduct.length; i++ ) {
                if( arrayProduct[i].id == id ){
                    arrayProduct.splice( i, 1 )
                    tbody.deleteRow( i ) 
                }
            }
        }
        
        return false
    }

    /* Este método é o ponto de partida, ele verifica se os dados submetidos -
    são para uma atualização ou para um novo cadastro por meio da propriedade editID */
    const save = () => {
        (editID === null) ? store( getValidateInputs() ) : update(editID)
        showListData( (arrayProduct) )
        cleanForm()
    }


