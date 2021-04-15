import React, {useEffect, useState} from 'react';
import ReactDOM from 'react-dom';
import {Switcher} from './../../../HOC/Switch';
import {ChipsetHandler} from "../../../HOC/ChipsetHandler";
import './_Shared/style.scss'
import MyEditor from "../../_Micro/MyEditor/MyEditor";
// import DropZone from './../../../HOC/DropZone'


const Index = () => {

    const [chipset, setChipset] = useState([]);
    const [contentNew, setContentNew] = useState();
    const [edit, setEdit] = useState(false);

    useEffect(() => {

    })


    const HandleMakeName = () => {

    }

    const handleInput = (e) => {

    }

    const handleSwitchStatus = () => {

    }


    const handleAddChip = (item) => {
        // let metaDatas = {...metaData};
        let chipsets = [...chipset];
        console.log(chipset);

        chipsets.push(item);
        setChipset(chipsets);
        // metaDatas.tags = chipsets;
        // setMetaData(metaDatas);
        // console.log("meta dataaaaaa : ", metaDatas)
    }

    const RemoveChipset = (name) => {
        // let metaData = {...metaData};
        var chipsetArr = [...chipset];
        var index = chipsetArr.indexOf(name);
        if (index !== -1) {
            chipsetArr.splice(index, 1);
            setChipset(chipsetArr);
            // metaData.tags = chipsetArr;
            // setMetaData(metaData)
        }
    }
    let dataUpdateParse = useState({
        status: true
    });
    return (
        <div>
            <div className="tab-content pt-1">
                <div className="tab-pane active" id="home-fill" role="tabpanel" aria-labelledby="home-tab-fill">
                    <div className={"row"}>
                        <div className={"col-lg-8 col-md-8 col-sm-12"}>
                            <fieldset className="form-group">
                                <label htmlFor={"title"}>عنوان دسته بندی</label>
                                <input type={"text"} defaultValue={HandleMakeName()} onChange={e => handleInput(e)}
                                       name={"name"} id={"title"}
                                       className={"form-control titleCat"}/>
                            </fieldset>
                        </div>
                        <div className={"col-lg-4 col-md-4 col-sm-12"}>
                            <fieldset className="form-group">
                                <label id={"selectParent"}>وضعیت نمایش</label>
                                <Switcher
                                    defaultState={dataUpdateParse ? dataUpdateParse.status == "active" ? true : false : true}
                                    status={(state) => handleSwitchStatus(state)} name={"showState"}
                                    valueActive={"فعال"}
                                    valueDeActive={"غیرفعال"}/>
                            </fieldset>
                        </div>
                        <div className={"col-12"}>
                            <form action="#" className="dropzone dropzone-area" id="dpz-file-limits">
                                <div className="dz-message">فایل های خود را برای ارسال به اینجا بکشید</div>
                            </form>

                        </div>
                    </div>
                </div>
                <div className="tab-pane" id="profile-fill" role="tabpanel" aria-labelledby="profile-tab-fill">
                    <div className={"row"} >
                        <div className="col-md-6">
                            <div className="form-group">
                                <select className="select2-size-lg form-control" multiple>
                                    <optgroup label="شکل ها">
                                        <option value="romboid">دایره</option>
                                        <option value="trapeze" selected>بیضی</option>
                                        <option value="triangle">مثلث</option>
                                        <option value="polygon">چند ضلعی</option>
                                    </optgroup>
                                    <optgroup label="رنگ ها">
                                        <option value="red">قرمز</option>
                                        <option value="green">سبز</option>
                                        <option value="blue" selected>آبی</option>
                                        <option value="purple">بنفش</option>
                                    </optgroup>
                                </select>
                            </div>
                        </div>
                        <div className={"col-md-6"}>
                                <div className={"row"} id={"chipset-container"}>
                                    <div className={"col-sm-12 col-md-4 col-lg-4"}>
                                        <ChipsetHandler  callback={item => handleAddChip(item)}/>
                                    </div>
                                    {chipset ? chipset.map(item => (
                                        <div className="chip mr-1">
                                            <div className="chip-body">
                                                <span className="chip-text">{item}</span>
                                                <div className="chip-closeable"
                                                     onClick={e => RemoveChipset(item)}>
                                                    <i className="bx bx-x"></i>
                                                </div>
                                            </div>
                                        </div>
                                    )) : ''}
                                </div>
                        </div>
                        <div className={"col-12"}>
                            <MyEditor editorData={data => {
                                setEdit(true)
                                setContentNew(data)
                            }}
                                      id={"my-editor"}
                                      type={"small"}
                                      defaultVal={dataUpdateParse ? dataUpdateParse.content : ''}
                                      placeholder={"توضیحات دسته بندی را بنویسید ..."}/>
                        </div>
                    </div>
                </div>
                <div className="tab-pane" id="messages-fill" role="tabpanel"
                     aria-labelledby="messages-tab-fill">
                    <p>
                        لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان
                        گرافیک است. چاپگرها و متون بلکه روزنامه
                    </p>
                </div>
                <div className="tab-pane" id="settings-fill" role="tabpanel"
                     aria-labelledby="settings-tab-fill">
                    <p>
                        لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان
                        گرافیک است. چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است و
                        برای شرایط فعلی تکنولوژی مورد نیاز و کاربردهای متنوع
                    </p>
                </div>
            </div>
        </div>
    )
}

export default Index;

let eleman = document.getElementById("shop_product_manager");
if (eleman) {
    ReactDOM.render(<Index/>, eleman)
}
