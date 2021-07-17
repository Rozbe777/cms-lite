import React from "react";
import Loading from "../../_Micro/Loading";
import Item from './Item'

export const ListLoader = ({Products , checked}) => {
    console.log("ppp" , Products)
    if (Products.data.length > 0) {
        Products.data.map((item, index) => {
            return (
                <Item key={index} data={item}
                      checkStateOfOut={checked}
                      sizeOf={Products.data.length}
                      handleEdit={e => console.log("edit")}
                      duplicated={e => console.log("duplicate")}
                      deleteClick={e => {
                          console.log("irem")
                          // handleDeleteGroup(e.event, e.id)
                      }}
                      selected={response => console.log("checked")}/>
            )
        })
    } else { // for empty product array
        return (
            <div id={"add-product-btn-box"}>
                <p>محصولی ثبت نشده است!</p>
                <button type={"button"} className={"btn btn-primary shadow mr-1 mb-1"}
                        onClick={e => console.log("adding")}>
                    افزودن محصول
                </button>
            </div>
        )
    }

}
