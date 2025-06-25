import { createContext,use,useContext,useState } from "react";
import {db,auth} from '../controller.js';
import {doc,setDoc,getDoc} from 'firebase/firestore';
import { onAuthStateChanged } from "firebase/auth";
import { useEffect } from "react";

const FavoritosContext = createContext(); //Armazena os favoritos 

export function FavoritosProvider({children}){
    const [favoritos,setFavoritos] = useState([]); //Filmes favoritos
    const [usuario, setUsuario] = useState(null); //Usuário Logado
    const [carregandoFavoritos, setCarregandoFavoritos] = useState(true); //Verificar usuário

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (user) => { //Verificação e usar o unsubscribe
            setUsuario(user);
            setCarregandoFavoritos(true);
            if(user){ 
                try{
                    const docRef = doc(db, "favoritados", user.uid); //puxa o firestore para tentar achar o documento
                    const docSnap = await getDoc(docRef);
                
            
                if(docSnap.exists()){
                    const dados = docSnap.data(); //Pega os dados 
                    setFavoritos(Array.isArray(dados.filmes) ? dados.filmes : []);
                } 
                else {
                    setCarrinho([]);
                }
            }
            catch(error){
                console.log("Erro ao carregar favoritos:", error);
                setFavoritos([]); //Atualiza os favoritos
            }
        }
        else {
            setFavoritos([]); //Limpa a pasta
        }
        setCarregandoFavoritos(false);
        })
        return () => unsubscribe();
 
        }, []);

    useEffect(() => {
        async function salvarFavoritosNoFirebase(lista){
            if(!usuario || carregandoFavoritos){ 
                return;
            }
                try{
                    const docRef = doc(db, 'favoritados', usuario.uid);
                    await setDoc(docRef, { filmes: lista })
                }
                catch(error){
                    console.log("Erro ao salvar no firebase:", error);
                }
            }
        salvarFavoritosNoFirebase(favoritos);
        }, [favoritos, usuario, carregandoFavoritos]);




    function adicionarFilme(filme){
        setFavoritos((anterior) => 
        Array.isArray(anterior) ? [...anterior, filme] : [filme]
        );
    }
     function removerFilme(index){ // Pega o indice do filme
        const novaLista = [];// Declaração da nova lista 

        setFavoritos((estadoAnterior) => { // Pega a lista anterior como parâmetro
            for(let i = 0; i < estadoAnterior.length; i++){
                if(i !== index){ //Comparação
                    novaLista.push(estadoAnterior[i]);
                }
            }
            return novaLista;
        })

    } 

    return(
        <FavoritosContext.Provider value={{favoritos,adicionarFilme,removerFilme}}>
            {children}
        </FavoritosContext.Provider>

    )
}

export function useFavoritos(){
    return useContext(FavoritosContext);
}