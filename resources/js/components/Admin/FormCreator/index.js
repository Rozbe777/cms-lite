import React, {useState, useEffect} from 'react';
import ReactDOM from 'react-dom';
import './_Shared/style.scss';
import MyEditor from "./HOC/MyEditor/MyEditor";
import InitialData from "./Data/InitialData";
import {DragDropContext} from "react-beautiful-dnd";
import Board from "./HOC/Board";
import $ from 'jquery';
import FormDrop from './HOC/FormDrop';
import {FormTheme} from "./Helper/Context";
import {BreadCrumbs} from "../UserList/HOC/BreadCrumbs";
import FormSetting from "./HOC/FormSetting/FormSetting";
import StyleSetting from "./HOC/FormSetting/StyleSetting";
import FeedSetting from "./HOC/FormSetting/FeedSetting";

const Index = () => {
    const [state, setState] = useState(InitialData);
    const [toolsBox, setToolsBox] = useState();
    const [formTheme, setFormTheme] = useState({
        buttonBackground: '#e91e63',
        buttonColor: '#ffffff',
        bodyBackground: '#ffffff',
        inputBackground: '#f2f4f4',
        inputBorder: '#f0f0f0',
        textColor: '#555555',
        placeholderColor: '#000000',
        topEditorColor: '#fafafa',
        editorIcon: '#000000',
        iconHoverColor: '#ffffff',
        editorContentColor: '#000000',
        editorContentBackground: '#ffffff',
    })

    useEffect(() => {
        $("#breadCrumb").addClass("activeCrumb");
        $("#formBuilderCategory").click(function () {
            $(".form-category-back").fadeIn()
            setTimeout(() => {
                $("#form-builder-cat-manage").addClass("active");
            }, 400)
        });

        $("#close-cat-manager").click(function () {
            $("#form-builder-cat-manage").removeClass("active");
            setTimeout(() => {
                $(".form-category-back").fadeOut()
            }, 400)
        })

        $(".nav-tabs.settingll .nav-item").click(function () {
            $(".toggle-setting-click").html('');
            $(".toggle-setting-click").append('<i class="bx bx-minus"></i>');
        })

        $(".toggle-setting-click").click(function () {
            var checkACtive = $(".nav-tabs.settingll .nav-item a").hasClass("active");
            var tabContent = $(".tab-content.settingll .tab-pane");
            if (checkACtive) {
                $(this).html('');
                $(this).append('<i class="bx bx-plus"></i>');
                $(".nav-tabs.settingll .nav-item a").removeClass("active");
                tabContent.removeClass("active");
            } else {
                $(this).html('');
                $(this).append('<i class="bx bx-minus"></i>');
                $(".nav-tabs.settingll .nav-item:first-child a").addClass("active");
                $(".tab-content.settingll .tab-pane").eq(0).addClass("active");
            }

            var header = document.querySelector(".flexiable");
            var upperBox = document.querySelector(".header-form-option");
            var upperBoxWidth = upperBox.offsetWidth;
            header.style.width = upperBoxWidth + "px";
        })
    }, [])


    //
    window.onscroll = function () {
        var header = document.querySelector(".flexiable");
        var sticky = header.offsetTop;
        var upperBox = document.querySelector(".header-form-option");
        var bredHeight = document.querySelector("#breadCrumb").offsetHeight;
        var navHeight = document.querySelector(".navbar-wrapper").offsetHeight;
        var upperBoxTop = upperBox.offsetTop;
        var upperBoxWidth = upperBox.offsetWidth;
        var upperBoxheight = upperBox.offsetHeight;
        header.style.width = upperBoxWidth + "px";
        let totalTop = upperBoxTop + upperBoxheight +navHeight+bredHeight;
        console.log("offsetfffff : ", upperBoxTop + upperBoxheight +navHeight+bredHeight , navHeight , bredHeight);

        // if (sticky > 50) {
        //
        //     if (window.pageYOffset >= sticky) {
        //         header.classList.add("stickyss");
        //     } else {
        //         header.classList.remove("stickyss");
        //     }
        // }else{
            if (window.pageYOffset >=totalTop) {
                header.classList.add("stickyss");
            } else {
                header.classList.remove("stickyss");
            }

        // checkScroll(sticky)
    }


    // const checkScroll = (offset) => {
    //     var header = document.querySelector(".flexiable");
    //     console.log("offset : ", offset)
    //     if (window.pageYOffset > offset) {
    //         header.classList.add("stickyss");
    //     } else {
    //         header.classList.remove("stickyss");
    //     }
    // }


    const onDragStart = () => {
        document.body.style.color = "orange"
    }


    const onDragEnd = result => {
        const {destination, source, draggableId} = result;
        if (!destination) {
            return;
        }
        if (destination.droppableId === "tools" && source.droppableId === "inspect") {

        } else {
            if (destination.droppableId === source.droppableId && destination.index === source.index) {
                return;
            }

            $(".nav-tabs li a").removeClass("active");
            $(".tab-pane").removeClass("active");
            $(".tab-pane.field").addClass("active");
            $(".nav-tabs li a.field").addClass("active");

            const start = state.columns[source.droppableId];
            const finish = state.columns[destination.droppableId];

            if (start === finish) {
                const newTaskId = Array.from(start.taskIds);
                newTaskId.splice(source.index, 1);
                newTaskId.splice(destination.index, 0, draggableId);

                const newColumn = {
                    ...start,
                    taskIds: newTaskId
                };

                const newState = {
                    ...state,
                    columns: {
                        ...state.columns,
                        [newColumn.id]: newColumn
                    }
                }
                setState(newState);
                return;
            }

            const startTaskIds = Array.from(start.taskIds);
            startTaskIds.splice(source.index, 1);
            const newStart = {
                ...start,
                taskIds: startTaskIds
            };

            const finishTaskIds = Array.from(finish.taskIds);
            finishTaskIds.splice(destination.index, 0, draggableId);
            const newFinish = {
                ...finish,
                taskIds: finishTaskIds
            };
            const newState = {
                ...state,
                columns: {
                    ...state.columns,
                    [newStart.id]: newStart,
                    [newFinish.id]: newFinish
                }
            }

            setState(newState);
            return;
        }
    }


    const Tools = state.columns['tools'];
    const HtmlCreate = state.columns['inspect'];
    const Tasks = Tools.taskIds.map(taskId => state.task[taskId]);
    const HtmlTask = HtmlCreate.taskIds.map(taskId => state.task[taskId]);


    return (

        <>

            <FormTheme.Provider value={{formTheme, setFormTheme}}>
                <div className={"row col-12"} id={"headerContent"}>
                    <BreadCrumbs data={{title: 'فرم ساز', desc: 'ساخت و تنظیمات فرمهای شخصی'}}
                                 floatBtn={"formBuilderCategory"} titleBtn={"دسته بندی ها"}/>
                </div>
                <div className={"row"} style={{padding: '5px 20px'}}>
                    <DragDropContext
                        onDragEnd={onDragEnd}
                        onDragStart={onDragStart}
                    >
                        <div className={"col-lg-4 col-md-6"}
                             style={{padding: '8px 5px ', borderRadius: 5, position: 'relative', display: 'initial'}}>
                            <div className={"row header-form-option"} style={{padding: 0, position: 'relative'}}>

                                <div className={"toggle-setting-click"}>
                                    <i className={"bx bx-plus"}></i>
                                </div>

                                <div className={"col-12"} style={{padding: 0}}>
                                    <ul className="nav nav-tabs settingll" id={"formCreator"} role="tablist"
                                        style={{
                                            background: '#fff',
                                            margin: 0,
                                            borderRadius: '5px 5px 0 0',
                                            marginTop: '20px'
                                        }}>
                                        <li className="nav-item col-4">
                                            <a className="nav-link" id="settingform-tab-md" data-toggle="tab"
                                               href="#settingform-md" role="tab"
                                               aria-controls="settingform-md"
                                               aria-selected="true">تنظیمات فرم</a>
                                        </li>
                                        <li className="nav-item col-4">
                                            <a className="nav-link" id="style-tab-md" data-toggle="tab" href="#style-md"
                                               role="tab"
                                               aria-controls="style-md"
                                               aria-selected="false">تنظیمات ظاهری</a>
                                        </li>
                                        <li className="nav-item col-4">
                                            <a className="nav-link" id="news-tab-md" data-toggle="tab" href="#news-md"
                                               role="tab"
                                               aria-controls="news-md"
                                               aria-selected="false">اطلاع رسانی</a>
                                        </li>
                                    </ul>
                                    <div className="tab-content settingll card pt-5"
                                         style={{padding: '20px 0 !important'}}
                                         id="myTabContentMD">
                                        <div className="tab-pane" id="settingform-md" role="tabpanel"
                                             aria-labelledby="settingform-tab-md">


                                            <FormSetting/>


                                        </div>


                                        <div className="tab-pane" id="style-md" role="tabpanel"
                                             aria-labelledby="style-tab-md">

                                            <StyleSetting/>

                                        </div>

                                        <div className="tab-pane" id="news-md" role="tabpanel"
                                             aria-labelledby="news-tab-md">

                                            <FeedSetting/>

                                        </div>

                                    </div>
                                </div>


                                <div className={"row"} style={{padding: '0 0 5px 5px', margin: 0 ,width : '100%'}}>
                                    <div className={"col-4"}>
                                        <button type={"button"} className={"btn btn-outline-primary mr-1 mb-1"}>
                                            <i className={"bx bxs-show"}></i>&nbsp;
                                            نمایش
                                        </button>
                                    </div>
                                    <div className={"col-4"}>
                                        <button type={"button"} className={"btn btn-outline-danger mr-1 mb-1"}>
                                            <i className={"bx bxs-trash"}></i>&nbsp;
                                            حذف
                                        </button>
                                    </div>
                                    <div className={"col-4"}>
                                        <button type={"button"}
                                                className={"btn btn-outline-success mr-1 mb-1"}>
                                            <i className={"bx bx-save"}></i>&nbsp;
                                            ذخیره
                                        </button>

                                    </div>

                                </div>
                            </div>

                            <div className={"flexiable"}>
                                <ul className="nav nav-tabs" id={"formCreator"} role="tablist"
                                    style={{background: '#fff', margin: 0, borderRadius: '5px 5px 0 0'}}>
                                    <li className="nav-item">
                                        <a className="nav-link active" id="home-tab-md" data-toggle="tab"
                                           href="#home-md"
                                           role="tab"
                                           aria-controls="home-md"
                                           aria-selected="true">افزودن فیلد</a>
                                    </li>
                                    <li className="nav-item">
                                        <a className="nav-link field" id="profile-tab-md" data-toggle="tab"
                                           href="#profile-md"
                                           role="tab"
                                           aria-controls="profile-md"
                                           aria-selected="false">ویرایش فیلد</a>
                                    </li>
                                </ul>
                                <div className="tab-content card pt-5" style={{padding: '20px 0 !important'}}
                                     id="myTabContentMD">

                                    <div className="tab-pane active" id="home-md" role="tabpanel"
                                         aria-labelledby="home-tab-md">

                                        <div style={{
                                            width: '100%',
                                            height: '100%',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'space-between',
                                            flexDirection: 'column',
                                        }}>
                                            <Board key={Tasks.id} column={Tools} tasks={Tasks}/>
                                        </div>
                                    </div>
                                    <div className="tab-pane field" id="profile-md" role="tabpanel"
                                         aria-labelledby="profile-tab-md">
                                        <div id={"setting_main_content"}>
                                            <p style={{textAlign: 'center'}}>فیلدی انتخاب نشده است!</p>
                                        </div>
                                    </div>
                                </div>
                            </div>


                        </div>
                        <div className={"col-lg-8 col-md-6"} style={{padding: '0 5px'}}>
                            <div className={"action-content"}
                                 style={{background: formTheme.bodyBackground, color: formTheme.textColor}}>
                                <div className={"box-image-desc"}>
                            <span style={{borderColor: formTheme.inputBorder}}>
                               <input type="file" name="myImage" className={"imageUpload"} accept="image/*"/>
                               <p>برای آپلود تصویر کلیک کنید</p>
                            </span>
                                </div>
                                <div className={"row"} style={{padding: '20px'}}>
                                    <div className={"col-12"}>
                                        <div className={"form-group"}>
                                            <label htmlFor={"title"} style={{color: formTheme.textColor}}>عنوان
                                                *</label>
                                            <input type={"text"} className={"form-control"} id={"title"}
                                                   style={{
                                                       borderColor: formTheme.inputBorder,
                                                       background: formTheme.inputBackground,
                                                       color: formTheme.placeholderColor,
                                                       paddingRight: '10px !important'
                                                   }}
                                                   name={"title"}/>
                                        </div>
                                    </div>
                                    <div className={"col-12"}>
                                        <label style={{color: formTheme.textColor}}>{'توضیحات فرم'}</label>
                                        <MyEditor/>
                                    </div>
                                    <div className={"col-12"} style={{marginTop: '15px'}}>
                                        <div className={"element-chose"} style={{borderColor: formTheme.borderColor}}>
                                            <FormDrop key={HtmlTask.id} column={HtmlCreate} tasks={HtmlTask}/>
                                            {HtmlTask.length > 0 ? (
                                                <>
                                                </>
                                            ) : (
                                                <p>روی فیلد ها کلیک کنید یا به اینجا بکشید</p>
                                            )}
                                        </div>
                                    </div>

                                    <div className={"col-12"}>
                                        <div className={"form-group"}>
                                            <label htmlFor={"title"} style={{color: formTheme.textColor}}>متن دکمه
                                                ثبت</label>
                                            <input type={"text"} className={"form-control"} id={"title"} name={"title"}
                                                   style={{
                                                       borderColor: formTheme.inputBorder,
                                                       background: formTheme.inputBackground,
                                                       color: formTheme.placeholderColor,
                                                       paddingRight: '10px !important'
                                                   }}
                                                   defaultValue={"ثبت نام"}/>
                                        </div>
                                    </div>

                                    <div className={"col-12"}>
                                        <label style={{color: formTheme.textColor}}>{'پیام موفقیت'}</label>
                                        <MyEditor label={"پیام موفقیت"}/>
                                    </div>

                                </div>

                            </div>

                        </div>
                    </DragDropContext>


                </div>


                <div className={"form-category-back"}>
                    <div className="row justify-content-center " id={"form-builder-cat-manage"}>
                        <div className="col-lg-5 col-md-8 col-sm-10" style={{
                            borderRadius: 5,
                            background: '#fff',
                            marginTop: '10vh',
                            padding: 0,
                            overflow: 'hidden'
                        }}>


                            <div className={"top-add-cat"}>
                            <span style={{right: '0px'}} id={"close-cat-manager"}>
                                <i className={"bx bx-x"}></i>
                            </span>
                                <input type={"text"} name={"new-form-cat"}
                                       placeholder={"نام دسته بندی جدید را تایپ کنید ..."}/>

                                <span>
                                <i className={"bx bx-plus"}></i>
                            </span>
                            </div>

                            <div className={"content-cat"}>

                                {/*<p id="none-object">شما هنوز دسته ای اضافه نکرده اید!</p>*/}


                                <ul>
                                    <li>

                                        <p id={"cat-title-show"}> 1 - این یک تست است برای دسته بندییییی و تست ان در
                                            موارد
                                            بالاتر ی و تست ان در موارد بالاتر برای هر کاربر</p>
                                        <div id={"action-cat"}>
                                            <i className={"bx bx-trash-alt"}></i>
                                            <i className={"bx bxs-pencil"}></i>
                                        </div>

                                    </li>

                                    <li>

                                        <p id={"cat-title-show"}>این یک تست است برای دسته بندییییی و تست ان در موارد
                                            بالاتر
                                            ی و تست ان در موارد بالاتر برای هر کاربر</p>
                                        <div id={"action-cat"}>
                                            <i className={"bx bx-trash-alt"}></i>
                                            <i className={"bx bxs-pencil"}></i>
                                        </div>

                                    </li>

                                    <li>

                                        <p id={"cat-title-show"}>این یک تست است برای دسته بندییییی و تست ان در موارد
                                            بالاتر
                                            ی و تست ان در موارد بالاتر برای هر کاربر</p>
                                        <div id={"action-cat"}>
                                            <i className={"bx bx-trash-alt"}></i>
                                            <i className={"bx bxs-pencil"}></i>
                                        </div>

                                    </li>

                                    <li>

                                        <p id={"cat-title-show"}>این یک تست است برای دسته بندییییی و تست ان در موارد
                                            بالاتر
                                            ی و تست ان در موارد بالاتر برای هر کاربر</p>
                                        <div id={"action-cat"}>
                                            <i className={"bx bx-trash-alt"}></i>
                                            <i className={"bx bxs-pencil"}></i>
                                        </div>

                                    </li>

                                    <li>

                                        <p id={"cat-title-show"}>این یک تست است برای دسته بندییییی و تست ان در موارد
                                            بالاتر
                                            ی و تست ان در موارد بالاتر برای هر کاربر</p>
                                        <div id={"action-cat"}>
                                            <i className={"bx bx-trash-alt"}></i>
                                            <i className={"bx bxs-pencil"}></i>
                                        </div>

                                    </li>

                                    <li>

                                        <p id={"cat-title-show"}>این یک تست است برای دسته بندییییی و تست ان در موارد
                                            بالاتر
                                            ی و تست ان در موارد بالاتر برای هر کاربر</p>
                                        <div id={"action-cat"}>
                                            <i className={"bx bx-trash-alt"}></i>
                                            <i className={"bx bxs-pencil"}></i>
                                        </div>

                                    </li>


                                </ul>

                            </div>


                        </div>

                    </div>
                </div>
            </FormTheme.Provider>

        </>

    )
}

export default Index;

let element = document.getElementById("form-creator");
if (element) {
    ReactDOM.render(<Index/>, element);
}
