import { createContext,use,useContext,useState } from "react";
import {db,auth} from '../controller.js';
import {doc,setDoc,getDoc} from 'firebase/firestore';
import { onAuthStateChanged } from "firebase/auth";
import { useEffect } from "react";

const FavoritosContext = createContext();

export function FavoritosProvider({children}){
    const [favoritos,setFavoritos] = useState([]);
    const [usuario, setUsuario] = useState(null);
    const [carregandoFavoritos, setCarregandoFavoritos] = useState(true);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            setUsuario(user);
            setCarregandoFavoritos(true);
            if(user){
                try{
                    const docRef = doc(db, "favoritados", user.uid);
                    const docSnap = await getDoc(docRef);
                
            
                if(docSnap.exists()){
                    const dados = docSnap.data();
                    setFavoritos(Array.isArray(dados.filmes) ? dados.filmes : []);
                } 
                else {
                    setCarrinho([]);
                }
            }
            catch(error){
                console.log("Erro ao carregar favoritos:", error);
                setFavoritos([]);
            }
        }
        else {
            setFavoritos([]);
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
     function removerFilme(index){
        const novaLista = [];

        setFavoritos((estadoAnterior) => {
            for(let i = 0; i < estadoAnterior.length; i++){
                if(i !== index){
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