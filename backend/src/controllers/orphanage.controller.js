import { getAllOrphanages, getOrphanageById, registerOrphanage } from "./orphanage.js";



const orphanagecontroller ={
    createorphan: registerOrphanage,
    getorphan:getAllOrphanages,
    getorphanbyid:getOrphanageById
}

export {orphanagecontroller}