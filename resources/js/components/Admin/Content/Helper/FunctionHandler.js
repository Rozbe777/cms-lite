export default class FunctionHandler{
    handlePreShowImage(event , preImage , setPreImage){
        event.preventDefault();
        let preImages = {...preImage}
        if (event.target.files && event.target.files[0]) {
            preImages.uri = URL.createObjectURL(event.target.files[0])
            setPreImage(preImages)
        }
    }
    HandleFile(e , preImage , setPreImage , setEdit , setFile , imageGet,setImage){
        this.handlePreShowImage(e, preImage, setPreImage)
        setEdit(true)
        let files = e.target.files[0];
        setFile({file: files});
        imageGet.state = '';
        setImage(imageGet);
    }

    handledelImg(e , setEdit , imageGet , setImage,setPreImage,preImage){
        e.preventDefault();
        setEdit(true)
        let states = {...imageGet};
        states.state = '';
        setImage(states)
        let preImages = {...preImage}
        preImages.uri = '';
        setPreImage(preImages)
    }

    MakeNewName(name , formData){
        let formDatas = {...formData}
        const min = 1;
        const max = 1000;
        const rand = Number(min + Math.random() * (max - min)).toFixed(0);
        formDatas.title = name + rand + "_کپی";
        formDatas.slug = name + rand + "_کپی";
        return name + rand + "_کپی";
    }

    HandleMakeName(dataUpdateParse , formData , type){
        if (dataUpdateParse) {
            if (type == "dup") {
                return this.MakeNewName(dataUpdateParse.title);
            } else {
                return dataUpdateParse.title;
            }
        } else {
            formData.slug = formData.title;
            return formData.title;
        }
    }

    RemoveChipset(e , name  , chipset , setChipset , setChipChange ){
        e.preventDefault();
        setChipChange(true)
        let chipsetArr = [...chipset];
        let index = chipsetArr.indexOf(name);
        if (index !== -1) {
            chipsetArr.splice(index, 1);
            setChipset(chipsetArr);
        }
    }

    handleAddChip(item , setEdit,setChipChange,chipset,setChipset){
        setEdit(true)
        setChipChange(true)
        let chipsets = [...chipset];
        if (item === "") {

        } else {
            chipsets.push(item);
            setChipset(chipsets);
        }
    }

    handleInput(e , setChangeCheck , setEdit ,slugManage,formData,setFormData){
        setChangeCheck(true)
        setEdit(true);
        if (e.target.name == "titleContent") {
            if (slugManage) {
                let formDataOld = {...formData};
                formDataOld.title = e.target.value;
                formDataOld.slug = e.target.value;
                setFormData(formDataOld);
            } else {
                let formDataOld = {...formData};
                formDataOld.title = e.target.value;
                setFormData(formDataOld);
            }
        } else {
            let formDataOld = {...formData};
            formDataOld.slug = e.target.value;
            setFormData(formDataOld);
        }
    }


    HandleMetaData(e , setEdit , setMetaData , metaData){
        setEdit(true)
        setMetaData({
            ...metaData,
            [e.target.name]: e.target.value
        })
    }


    handleAddress(status , setEdit , setSlugManage){
        setEdit(true)
        setSlugManage(status)
    }

}
