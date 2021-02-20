@extends("panel.themes.frest.layouts.dashboardLayout")
@php($title = "کاربران")

@section("content")
    <div class="app-content content">
        <div class="content-overlay"></div>
        <div class="content-wrapper">
            <div class="content-header row">
            </div>
            <div class="content-body"><!-- users list start -->
                <section class="users-list-wrapper">
                    <div class="users-list-filter px-1">
                        <form>
                            <div class="row border rounded py-2 mb-2">
                                <div class="col-12 col-sm-6 col-lg-3">
                                    <label for="users-list-verified">تایید شده</label>
                                    <fieldset class="form-group">
                                        <select class="form-control" id="users-list-verified">
                                            <option value="">همه</option>
                                            <option value="بله">بله</option>
                                            <option value="خیر">خیر</option>
                                        </select>
                                    </fieldset>
                                </div>
                                <div class="col-12 col-sm-6 col-lg-3">
                                    <label for="users-list-role">نقش</label>
                                    <fieldset class="form-group">
                                        <select class="form-control" id="users-list-role">
                                            <option value="">همه</option>
                                            <option value="کاربر">کاربر</option>
                                            <option value="کارمند">کارمند</option>
                                        </select>
                                    </fieldset>
                                </div>
                                <div class="col-12 col-sm-6 col-lg-3">
                                    <label for="users-list-status">وضعیت</label>
                                    <fieldset class="form-group">
                                        <select class="form-control" id="users-list-status">
                                            <option value="">همه</option>
                                            <option value="فعال">فعال</option>
                                            <option value="بسته شده">بسته شده</option>
                                            <option value="مسدود شده">مسدود شده</option>
                                        </select>
                                    </fieldset>
                                </div>
                                <div class="col-12 col-sm-6 col-lg-3 d-flex align-items-center">
                                    <button type="reset" class="btn btn-primary btn-block glow users-list-clear mb-0 mt-75">پاکسازی</button>
                                </div>
                            </div>
                        </form>
                    </div>
                    <div class="users-list-table">
                        <div class="card">
                            <div class="card-content">
                                <div class="card-body">
                                    <!-- datatable start -->
                                    <div class="table-responsive">
                                        <table id="users-list-datatable" class="table">
                                            <thead>
                                            <tr>
                                                <th>ID</th>
                                                <th>نام کاربری</th>
                                                <th>نام</th>
                                                <th>آخرین فعالیت</th>
                                                <th>تایید شده</th>
                                                <th>نقش</th>
                                                <th>وضعیت</th>
                                                <th>ویرایش</th>
                                            </tr>
                                            </thead>
                                            <tbody>
                                            <tr>
                                                <td>300</td>
                                                <td><a href="page-users-view.html">dean3004</a>
                                                </td>
                                                <td>دنیل پانابکر</td>
                                                <td>1399/01/14</td>
                                                <td>خیر</td>
                                                <td>کارمند</td>
                                                <td><span class="badge badge-light-success">فعال</span></td>
                                                <td><a href="page-users-edit.html"><i class="bx bx-edit-alt"></i></a></td>
                                            </tr>
                                            <tr>
                                                <td>301</td>
                                                <td><a href="page-users-view.html">zeena0604</a>
                                                </td>
                                                <td>تونی استارک</td>
                                                <td>1399/01/15</td>
                                                <td>بله</td>
                                                <td>کاربر </td>
                                                <td><span class="badge badge-light-success">فعال</span></td>
                                                <td><a href="page-users-edit.html"><i class="bx bx-edit-alt"></i></a></td>
                                            </tr>
                                            <tr>
                                                <td>302</td>
                                                <td><a href="page-users-view.html">delilah0301</a>
                                                </td>
                                                <td>استیو راجرز</td>
                                                <td>1399/01/16</td>
                                                <td>بله</td>
                                                <td>کاربر </td>
                                                <td><span class="badge badge-light-success">فعال</span></td>
                                                <td><a href="page-users-edit.html"><i class="bx bx-edit-alt"></i></a></td>
                                            </tr>
                                            <tr>
                                                <td>303</td>
                                                <td><a href="page-users-view.html">hillary1807</a>
                                                </td>
                                                <td>پیتر پارکر</td>
                                                <td>1399/01/17</td>
                                                <td>خیر</td>
                                                <td>کارمند</td>
                                                <td><span class="badge badge-light-danger">مسدود شده</span></td>
                                                <td><a href="page-users-edit.html"><i class="bx bx-edit-alt"></i></a></td>
                                            </tr>
                                            <tr>
                                                <td>304</td>
                                                <td><a href="page-users-view.html">herman2003</a>
                                                </td>
                                                <td>سارا لنس</td>
                                                <td>1399/01/18</td>
                                                <td>خیر</td>
                                                <td>کارمند</td>
                                                <td><span class="badge badge-light-danger">مسدود شده</span></td>
                                                <td><a href="page-users-edit.html"><i class="bx bx-edit-alt"></i></a></td>
                                            </tr>
                                            <tr>
                                                <td>305</td>
                                                <td><a href="page-users-view.html">kuame3008</a>
                                                </td>
                                                <td>جان اسنو</td>
                                                <td>1399/01/19</td>
                                                <td>بله</td>
                                                <td>کاربر </td>
                                                <td><span class="badge badge-light-success">فعال</span></td>
                                                <td><a href="page-users-edit.html"><i class="bx bx-edit-alt"></i></a></td>
                                            </tr>
                                            <tr>
                                                <td>306</td>
                                                <td><a href="page-users-view.html">fulton2009</a>
                                                </td>
                                                <td>امیلیا کلارک</td>
                                                <td>1399/01/20</td>
                                                <td>بله</td>
                                                <td>کاربر </td>
                                                <td><span class="badge badge-light-success">فعال</span></td>
                                                <td><a href="page-users-edit.html"><i class="bx bx-edit-alt"></i></a></td>
                                            </tr>
                                            <tr>
                                                <td>307</td>
                                                <td><a href="page-users-view.html">piper0508</a>
                                                </td>
                                                <td>جسیکا آلبا</td>
                                                <td>1399/01/21</td>
                                                <td>بله</td>
                                                <td>کاربر </td>
                                                <td><span class="badge badge-light-success">فعال</span></td>
                                                <td><a href="page-users-edit.html"><i class="bx bx-edit-alt"></i></a></td>
                                            </tr>
                                            <tr>
                                                <td>308</td>
                                                <td><a href="page-users-view.html">neil1002</a>
                                                </td>
                                                <td>کریستوفر نولان</td>
                                                <td>1399/01/22</td>
                                                <td>خیر</td>
                                                <td>کارمند</td>
                                                <td><span class="badge badge-light-danger">مسدود شده</span></td>
                                                <td><a href="page-users-edit.html"><i class="bx bx-edit-alt"></i></a></td>
                                            </tr>
                                            <tr>
                                                <td>309</td>
                                                <td><a href="page-users-view.html">caldwell2402</a>
                                                </td>
                                                <td>بروس وین</td>
                                                <td>1399/01/23</td>
                                                <td>بله</td>
                                                <td>کاربر </td>
                                                <td><span class="badge badge-light-success">فعال</span></td>
                                                <td><a href="page-users-edit.html"><i class="bx bx-edit-alt"></i></a></td>
                                            </tr>
                                            <tr>
                                                <td>310</td>
                                                <td><a href="page-users-view.html">wesley0508</a>
                                                </td>
                                                <td>اولیور کویین</td>
                                                <td>1399/01/21</td>
                                                <td>خیر</td>
                                                <td>کارمند</td>
                                                <td><span class="badge badge-light-danger">مسدود شده</span></td>
                                                <td><a href="page-users-edit.html"><i class="bx bx-edit-alt"></i></a></td>
                                            </tr>
                                            <tr>
                                                <td>311</td>
                                                <td><a href="page-users-view.html">tallulah2009</a>
                                                </td>
                                                <td>بری الن</td>
                                                <td>1399/01/20</td>
                                                <td>خیر</td>
                                                <td>کارمند</td>
                                                <td><span class="badge badge-light-danger">مسدود شده</span></td>
                                                <td><a href="page-users-edit.html"><i class="bx bx-edit-alt"></i></a></td>
                                            </tr>
                                            <tr>
                                                <td>312</td>
                                                <td><a href="page-users-view.html">iris2505</a>
                                                </td>
                                                <td>هریسون ولز</td>
                                                <td>1399/01/24</td>
                                                <td>خیر</td>
                                                <td>کارمند</td>
                                                <td><span class="badge badge-light-danger">مسدود شده</span></td>
                                                <td><a href="page-users-edit.html"><i class="bx bx-edit-alt"></i></a></td>
                                            </tr>
                                            <tr>
                                                <td>313</td>
                                                <td><a href="page-users-view.html">caleb1504</a>
                                                </td>
                                                <td>لیونل مسی</td>
                                                <td>1399/01/25</td>
                                                <td>بله</td>
                                                <td>کاربر </td>
                                                <td><span class="badge badge-light-success">فعال</span></td>
                                                <td><a href="page-users-edit.html"><i class="bx bx-edit-alt"></i></a></td>
                                            </tr>
                                            <tr>
                                                <td>314</td>
                                                <td><a href="page-users-view.html">illiana0410</a>
                                                </td>
                                                <td>کریس رونالدو</td>
                                                <td>1399/01/26</td>
                                                <td>خیر</td>
                                                <td>کارمند</td>
                                                <td><span class="badge badge-light-danger">مسدود شده</span></td>
                                                <td><a href="page-users-edit.html"><i class="bx bx-edit-alt"></i></a></td>
                                            </tr>
                                            <tr>
                                                <td>315</td>
                                                <td><a href="page-users-view.html">chester0902</a>
                                                </td>
                                                <td>جرارد پیکه</td>
                                                <td>1399/01/27</td>
                                                <td>بله</td>
                                                <td>کاربر </td>
                                                <td><span class="badge badge-light-success">فعال</span></td>
                                                <td><a href="page-users-edit.html"><i class="bx bx-edit-alt"></i></a></td>
                                            </tr>
                                            <tr>
                                                <td>316</td>
                                                <td><a href="page-users-view.html">gregory2309</a>
                                                </td>
                                                <td>سرجیو راموس</td>
                                                <td>1399/01/28</td>
                                                <td>بله</td>
                                                <td>کاربر </td>
                                                <td><span class="badge badge-light-success">فعال</span></td>
                                                <td><a href="page-users-edit.html"><i class="bx bx-edit-alt"></i></a></td>
                                            </tr>
                                            <tr>
                                                <td>317</td>
                                                <td><a href="page-users-view.html">jescie1802</a>
                                                </td>
                                                <td>زین الدین زیدان</td>
                                                <td>1399/01/29</td>
                                                <td>خیر</td>
                                                <td>کارمند</td>
                                                <td><span class="badge badge-light-danger">مسدود شده</span></td>
                                                <td><a href="page-users-edit.html"><i class="bx bx-edit-alt"></i></a></td>
                                            </tr>
                                            <tr>
                                                <td>318</td>
                                                <td><a href="page-users-view.html">sydney3101</a>
                                                </td>
                                                <td>Sydney Cabrera</td>
                                                <td>1399/01/30</td>
                                                <td>خیر</td>
                                                <td>کارمند</td>
                                                <td><span class="badge badge-light-danger">مسدود شده</span></td>
                                                <td><a href="page-users-edit.html"><i class="bx bx-edit-alt"></i></a></td>
                                            </tr>
                                            <tr>
                                                <td>319</td>
                                                <td><a href="page-users-view.html">gray2702</a>
                                                </td>
                                                <td>Gray Valenzuela</td>
                                                <td>1399/01/31</td>
                                                <td>خیر</td>
                                                <td>کارمند</td>
                                                <td><span class="badge badge-light-warning">بسته شده</span></td>
                                                <td><a href="page-users-edit.html"><i class="bx bx-edit-alt"></i></a></td>
                                            </tr>
                                            <tr>
                                                <td>320</td>
                                                <td><a href="page-users-view.html">hoyt0305</a>
                                                </td>
                                                <td>Hoyt Ellison</td>
                                                <td>1399/02/01</td>
                                                <td>بله</td>
                                                <td>کاربر </td>
                                                <td><span class="badge badge-light-success">فعال</span></td>
                                                <td><a href="page-users-edit.html"><i class="bx bx-edit-alt"></i></a></td>
                                            </tr>
                                            <tr>
                                                <td>321</td>
                                                <td><a href="page-users-view.html">damon0209</a>
                                                </td>
                                                <td>Damon Berry</td>
                                                <td>1399/02/02</td>
                                                <td>خیر</td>
                                                <td>کارمند</td>
                                                <td><span class="badge badge-light-danger">مسدود شده</span></td>
                                                <td><a href="page-users-edit.html"><i class="bx bx-edit-alt"></i></a></td>
                                            </tr>
                                            <tr>
                                                <td>322</td>
                                                <td><a href="page-users-view.html">kelsie0511</a>
                                                </td>
                                                <td>Kelsie Dunlap</td>
                                                <td>1399/02/03</td>
                                                <td>بله</td>
                                                <td>کاربر </td>
                                                <td><span class="badge badge-light-warning">بسته شده</span></td>
                                                <td><a href="page-users-edit.html"><i class="bx bx-edit-alt"></i></a></td>
                                            </tr>
                                            <tr>
                                                <td>323</td>
                                                <td><a href="page-users-view.html">abel1606</a>
                                                </td>
                                                <td>Abel Dunn</td>
                                                <td>1399/02/04</td>
                                                <td>خیر</td>
                                                <td>کارمند</td>
                                                <td><span class="badge badge-light-danger">مسدود شده</span></td>
                                                <td><a href="page-users-edit.html"><i class="bx bx-edit-alt"></i></a></td>
                                            </tr>
                                            <tr>
                                                <td>324</td>
                                                <td><a href="page-users-view.html">nina2208</a>
                                                </td>
                                                <td>Nina Byers</td>
                                                <td>1399/02/05</td>
                                                <td>بله</td>
                                                <td>کاربر </td>
                                                <td><span class="badge badge-light-warning">بسته شده</span></td>
                                                <td><a href="page-users-edit.html"><i class="bx bx-edit-alt"></i></a></td>
                                            </tr>
                                            <tr>
                                                <td>325</td>
                                                <td><a href="page-users-view.html">erasmus1809</a>
                                                </td>
                                                <td>Erasmus Walter</td>
                                                <td>1399/02/06</td>
                                                <td>بله</td>
                                                <td>کاربر </td>
                                                <td><span class="badge badge-light-success">فعال</span></td>
                                                <td><a href="page-users-edit.html"><i class="bx bx-edit-alt"></i></a></td>
                                            </tr>
                                            <tr>
                                                <td>326</td>
                                                <td><a href="page-users-view.html">yael2612</a>
                                                </td>
                                                <td>Yael Marshall</td>
                                                <td>1399/02/07</td>
                                                <td>بله</td>
                                                <td>کاربر </td>
                                                <td><span class="badge badge-light-warning">بسته شده</span></td>
                                                <td><a href="page-users-edit.html"><i class="bx bx-edit-alt"></i></a></td>
                                            </tr>
                                            <tr>
                                                <td>327</td>
                                                <td><a href="page-users-view.html">thomas2012</a>
                                                </td>
                                                <td>Thomas Dudley</td>
                                                <td>1399/02/08</td>
                                                <td>بله</td>
                                                <td>کاربر </td>
                                                <td><span class="badge badge-light-success">فعال</span></td>
                                                <td><a href="page-users-edit.html"><i class="bx bx-edit-alt"></i></a></td>
                                            </tr>
                                            <tr>
                                                <td>328</td>
                                                <td><a href="page-users-view.html">althea2810</a>
                                                </td>
                                                <td>Althea Turner</td>
                                                <td>1399/02/09</td>
                                                <td>بله</td>
                                                <td>کاربر </td>
                                                <td><span class="badge badge-light-success">فعال</span></td>
                                                <td><a href="page-users-edit.html"><i class="bx bx-edit-alt"></i></a></td>
                                            </tr>
                                            <tr>
                                                <td>329</td>
                                                <td><a href="page-users-view.html">jena2206</a>
                                                </td>
                                                <td>Jena Schroeder</td>
                                                <td>1399/02/10</td>
                                                <td>خیر</td>
                                                <td>کارمند</td>
                                                <td><span class="badge badge-light-danger">مسدود شده</span></td>
                                                <td><a href="page-users-edit.html"><i class="bx bx-edit-alt"></i></a></td>
                                            </tr>
                                            <tr>
                                                <td>330</td>
                                                <td><a href="page-users-view.html">hyacinth2201</a>
                                                </td>
                                                <td>Hyacinth Maxwell</td>
                                                <td>1399/02/11</td>
                                                <td>خیر</td>
                                                <td>کارمند</td>
                                                <td><span class="badge badge-light-danger">مسدود شده</span></td>
                                                <td><a href="page-users-edit.html"><i class="bx bx-edit-alt"></i></a></td>
                                            </tr>
                                            <tr>
                                                <td>331</td>
                                                <td><a href="page-users-view.html">madeson1907</a>
                                                </td>
                                                <td>Madeson Byers</td>
                                                <td>1399/02/12</td>
                                                <td>بله</td>
                                                <td>کاربر </td>
                                                <td><span class="badge badge-light-success">فعال</span></td>
                                                <td><a href="page-users-edit.html"><i class="bx bx-edit-alt"></i></a></td>
                                            </tr>
                                            <tr>
                                                <td>332</td>
                                                <td><a href="page-users-view.html">elmo0707</a>
                                                </td>
                                                <td>Elmo Tran</td>
                                                <td>1399/02/13</td>
                                                <td>بله</td>
                                                <td>کاربر </td>
                                                <td><span class="badge badge-light-success">فعال</span></td>
                                                <td><a href="page-users-edit.html"><i class="bx bx-edit-alt"></i></a></td>
                                            </tr>
                                            <tr>
                                                <td>333</td>
                                                <td><a href="page-users-view.html">shelley0309</a>
                                                </td>
                                                <td>Shelley Eaton</td>
                                                <td>1399/02/14</td>
                                                <td>بله</td>
                                                <td>کاربر </td>
                                                <td><span class="badge badge-light-success">فعال</span></td>
                                                <td><a href="page-users-edit.html"><i class="bx bx-edit-alt"></i></a></td>
                                            </tr>
                                            <tr>
                                                <td>334</td>
                                                <td><a href="page-users-view.html">graham0301</a>
                                                </td>
                                                <td>Graham Flores</td>
                                                <td>1399/02/15</td>
                                                <td>خیر</td>
                                                <td>کارمند</td>
                                                <td><span class="badge badge-light-danger">مسدود شده</span></td>
                                                <td><a href="page-users-edit.html"><i class="bx bx-edit-alt"></i></a></td>
                                            </tr>
                                            <tr>
                                                <td>335</td>
                                                <td><a href="page-users-view.html">erasmus2110</a>
                                                </td>
                                                <td>Erasmus Mclaughlin</td>
                                                <td>1399/02/16</td>
                                                <td>بله</td>
                                                <td>کاربر </td>
                                                <td><span class="badge badge-light-success">فعال</span></td>
                                                <td><a href="page-users-edit.html"><i class="bx bx-edit-alt"></i></a></td>
                                            </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                    <!-- datatable ends -->
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                <!-- users list ends -->
            </div>
        </div>
    </div>

@endsection
