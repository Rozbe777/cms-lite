import React , {useState} from 'react';
import ReactDOM from 'react-dom';
import './_Shared/style.scss';
import MyEditor from "../_Micro/MyEditor/MyEditor";
import InitialData from "./Data/InitialData";
// import InitialFormElement from "./Data/InitialFormElement";
import {DragDropContext} from "react-beautiful-dnd";
import Board from "./HOC/Board";
import FormDrop from './HOC/FormDrop';
const Index = () => {


    const [state , setState] = useState(InitialData);
    const [formBuilder ,setFormBuilder] = useState({});

    const onDragStart = () => {
        document.body.style.color = "orange"
    }

    const onDragEnd = result => {
        const {destination, source, draggableId} = result;
        if (!destination){
            return;
        }
        if (destination.droppableId === "tools" && source.droppableId === "inspect")
        {

        }else{
            if (destination.droppableId === source.droppableId && destination.index === source.index) {
                return;
            }


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
        <div className={"row"} style={{padding: '15px'}}>
            <DragDropContext
                onDragEnd={onDragEnd}
                onDragStart={onDragStart}
            >
            <div className={"col-md-4"} style={{padding: '7px', borderRadius: 5}}>

                <div className={"row header-form-option"}>

                    <div className={"col-12"} style={{padding: 0}}>
                        <ul className="nav nav-tabs" id={"formCreator"} role="tablist"
                            style={{background: '#fff', margin: 0, borderRadius: '5px 5px 0 0'}}>
                            <li className="nav-item">
                                <a className="nav-link active" id="settingform-tab-md" data-toggle="tab"
                                   href="#settingform" role="tab"
                                   aria-controls="settingform-md"
                                   aria-selected="true">تنظیمات فرم</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" id="style-tab-md" data-toggle="tab" href="#style-md" role="tab"
                                   aria-controls="style-md"
                                   aria-selected="false">تنظیمات ظاهری</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" id="news-tab-md" data-toggle="tab" href="#news-md" role="tab"
                                   aria-controls="news-md"
                                   aria-selected="false">اطلاع رسانی</a>
                            </li>
                        </ul>
                        <div className="tab-content card pt-5" style={{padding: '20px 0 !important'}}
                             id="myTabContentMD">

                            <div className="tab-pane" id="settingform-md" role="tabpanel"
                                 aria-labelledby="settingform-tab-md">
                                <p>Food truck fixie locavore, accusamus mcsweeney's marfa nulla single-origin coffee
                                    sanderson 8-bit, sustainable jean shorts beard ut DIY
                                    ethical
                                    culpa terry
                                    richardson biodiesel. Art party scenester stumptown, tumblr butcher vero sint qui
                                    sapiente
                                    accusamus
                                    tattooed echo park.</p>
                            </div>


                            <div className="tab-pane" id="style-md" role="tabpanel" aria-labelledby="style-tab-md">
                                <p>Food truck fixie locavore, accusamus mcsweeney's marfa nulla single-origin coffee
                                    squid.
                                    Exercitation +1 labore velit, blog sartorial PBR leggings next level wes anderson
                                    artisan
                                    four loko
                                    farm-to-table craft beer twee. Qui photo booth letterpress, commodo enim craft beer
                                    mlkshk
                                    aliquip
                                    jean shorts ullamco ad vinyl cillum PBR. Homo nostrud organic, assumenda labore
                                    aesthetic
                                    magna
                                    delectus mollit. Keytar helvetica VHS salvia yr, vero magna velit sapiente labore
                                    stumptown.
                                    Vegan
                                    fanny pack odio cillum wes anderson 8-bit, sustainable jean shorts beard ut DIY
                                    ethical
                                    culpa terry
                                    richardson biodiesel. Art party scenester stumptown, tumblr butcher vero sint qui
                                    sapiente
                                    accusamus
                                    tattooed echo park.</p>
                            </div>

                            <div className="tab-pane" id="news-md" role="tabpanel" aria-labelledby="news-tab-md">
                                <p>Food truck fixie locavore, accusamus mcsweeney's marfa nulla single-origin coffee
                                    squid.
                                    Exercitation +1 labore velit, blog sartorial PBR leggings next level wes anderson
                                    artisan
                                    four loko
                                    farm-to-table craft beer twee. Qui photo booth letterpress, commodo enim craft beer
                                    mlkshk

                                    accusamus
                                    tattooed echo park.</p>
                            </div>


                        </div>
                    </div>


                    <div className={"col-4"}>
                        <button type={"button"} className={"btn btn-primary"}>
                            <i className={"bx bxs-show"}></i>&nbsp;
                            نمایش
                        </button>
                    </div>
                    <div className={"col-4"}>
                        <button type={"button"} className={"btn btn-danger"}>
                            <i className={"bx bxs-trash"}></i>&nbsp;
                            حذف
                        </button>
                    </div>
                    <div className={"col-4"}>
                        <button type={"button"} className={"btn btn-success"}>
                            <i className={"bx bx-save"}></i>&nbsp;
                            ذخیره
                        </button>

                    </div>
                </div>

                <div className={"flexiable"}>
                    <ul className="nav nav-tabs" id={"formCreator"} role="tablist"
                        style={{background: '#fff', margin: 0, borderRadius: '5px 5px 0 0'}}>
                        <li className="nav-item">
                            <a className="nav-link active" id="home-tab-md" data-toggle="tab" href="#home-md" role="tab"
                               aria-controls="home-md"
                               aria-selected="true">افزودن فیلد</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" id="profile-tab-md" data-toggle="tab" href="#profile-md" role="tab"
                               aria-controls="profile-md"
                               aria-selected="false">ویرایش فیلد</a>
                        </li>
                    </ul>
                    <div className="tab-content card pt-5" style={{padding: '20px 0 !important'}} id="myTabContentMD">


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



                                <Board key={Tasks.id} column={Tools}  tasks={Tasks} />


                            </div>
                        </div>

                        <div className="tab-pane" id="profile-md" role="tabpanel" aria-labelledby="profile-tab-md">
                            <p>Food truck fixie locavore, accusamus mcsweeney's marfa nulla single-origin coffee squid.
                                Exercitation +1 labore velit, blog sartorial PBR leggings next level wes anderson
                                artisan
                                four loko
                                farm-to-table craft beer twee. Qui photo booth letterpress, commodo enim craft beer
                                mlkshk
                                aliquip
                                jean shorts ullamco ad vinyl cillum PBR. Homo nostrud organic, assumenda labore
                                aesthetic
                                magna
                                delectus mollit. Keytar helvetica VHS salvia yr, vero magna velit sapiente labore
                                stumptown.
                                Vegan
                                fanny pack odio cillum wes anderson 8-bit, sustainable jean shorts beard ut DIY ethical
                                culpa terry
                                richardson biodiesel. Art party scenester stumptown, tumblr butcher vero sint qui
                                sapiente
                                accusamus
                                tattooed echo park.</p>
                        </div>
                    </div>
                </div>

            </div>
            <div className={"col-md-8"}>
                <div className={"action-content"}>

                    <div className={"box-image-desc"}>
                            <span>
                               <input type="file" name="myImage" accept="image/*"/>
                               <p>برای آپلود تصویر کلیک کنید</p>
                            </span>
                    </div>

                    <div className={"row"} style={{padding: '20px'}}>
                        <div className={"col-12"}>
                            <div className={"form-group"}>
                                <label for={"title"}>عنوان *</label>
                                <input type={"text"} className={"form-control"} id={"title"} name={"title"}/>
                            </div>
                        </div>

                        <div className={"col-12"}>
                            <MyEditor/>
                        </div>


                        <div className={"col-12"} style={{marginTop: '15px'}}>
                            <div className={"element-chose"}>
                                <FormDrop  key={HtmlTask.id} column={HtmlCreate}  tasks={HtmlTask} />
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
                                <label htmlFor={"title"}>متن دکمه ثبت</label>
                                <input type={"text"} className={"form-control"} id={"title"} name={"title"}
                                       defaultValue={"ثبت نام"}/>
                            </div>
                        </div>


                        <div className={"col-12"}>
                            <MyEditor label={"پیام موفقیت"}/>
                        </div>

                    </div>


                </div>
            </div>
            </DragDropContext>
        </div>
    )
}

export default Index;

let element = document.getElementById("form-creator");
if (element) {
    ReactDOM.render(<Index/>, element);
}
