import React, { useEffect, useState } from 'react';
import { Editor } from '@tinymce/tinymce-react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { postBoardArticleWrite } from "../../../api/board/boardAPI"; // URI 상수 import

const NoticeBoard = () => {
    const [article, setArticle] = useState({
        title: '',
        content: '', // TinyMCE의 내용을 여기에 저장할 것
        board: '공지사항', // 게시판 선택
        writer: '작성자ID', // 로그인 상태에서 작성자 ID를 가져와야 함
    });

    const navigate = useNavigate();

    const handleEditorChange = (content, editor) => {
        setArticle({ ...article, content }); // TinyMCE의 내용을 상태에 저장
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        try {
            const result = await postBoardArticleWrite(article);
            console.log("result: " + result);
    
            if(result) {
                alert("글 작성 완료");
                navigate("/app/mainboard");
            }
        } catch (error) {
            console.error("게시글 등록에 실패했습니다.", error);
            alert("게시글 등록에 실패했습니다.");
        }
    };
    

    return(
        <div className="boardContentDiv" id="boardContentDiv">
          <div className="g_search">
              <h2 className="blind">홈 서비스 통합 검색</h2>
              <div className="srch_box">
                  <div className="inp_box">
                      <label htmlFor="basicKeyword" className="blind">
                          <i>검색어</i>
                      </label>
                      <input id="basicKeyword" type="text" autoComplete="off" placeholder="게시글 검색"/>
                      <button type="button" className="btn_search">
                          <span className="blind">검색</span>
                      </button>
                      <button type="button" className="board_detail">
                          상세
                      </button>
                  </div>
                  <p className="status_message" style={{display: "none"}}>내 게시글에 자동 저장되었습니다. null</p>
                  <strong className="search_result" style={{display: "none"}}>검색 결과
                      <em className="count">0</em>
                  </strong>
                  <div className="ly_autocomplete" style={{display: "none"}}>
                      <ul style={{display: "none"}}>
                          <li style={{display: "none"}}>
                              <span className="empty">검색어 저장 기능이 꺼져있습니다.</span>
                          </li> 
                          <li>
                              <span className="empty">최근 검색어가 없습니다.</span>
                          </li>
                      </ul> 
                      <div className="save_keyword">
                          <button type="button" className="reset" style={{display: "none"}}>
                          전체 삭제
                          </button> 
                          <button type="button">
                          검색어저장 끄기
                          </button> 
                          <button type="button" style={{display: "none"}}>
                          검색어저장 켜기
                          </button>
                      </div>
                  </div>
              </div>
              <div className="srch_detail">
                  <h3 className="blind"></h3>
                  <div className="fm_keyword">
                      <div className="box_col1">
                          <strong className="tit">게시판</strong>
                          <div className="select_box board">
                              <button type="button" className="selected">
                                  <strong>전체 게시판</strong>
                              </button>
                              <div className="option_box" style={{zindex: "200"}}>
                                  <ul >
                                      <li className="">
                                          <button type="button">
                                           전체 게시판
                                          </button>
                                      </li> 
                                      <li className="line"></li>
                                      <li>
                                          <span>그린컴퓨터아카데미</span>
                                      </li> 
                                      <li className="depth">
                                          <button type="button">
                                           공지사항
                                          </button>
                                      </li> 
                                      <li className="depth">
                                          <button type="button">
                                          업무 매뉴얼
                                          </button>
                                      </li>
                                      <li className="depth">
                                          <button type="button">
                                          자유게시판
                                          </button>
                                      </li>
                                      <li className="line"></li> 
                                      <li className="">
                                          <button type="button">
                                          휴지통
                                          </button>
                                      </li> 
                                  </ul>
                              </div>
                          </div>
                      </div>
                      <div className="box_col2">
                          <strong className="tit">내용</strong>
                          <div className="select_box show">
                              <button type="button" className="selected">
                                  <strong>전체</strong>
                              </button>
                              <div className="option_box" style={{display: "none"}}>
                                  <ul>
                                      <li>
                                          <button type="button" className="sel"> 전체 </button>
                                      </li>
                                      <li>
                                          <button type="button" className> 제목+본문 </button>
                                      </li>
                                      <li>
                                          <button type="button" className> 제목 </button>
                                      </li>
                                      <li>
                                          <button type="button" className> 본문 </button>
                                      </li>
                                      <li>
                                          <button type="button" className> 첨부 파일 </button>
                                      </li>
                                  </ul>
                              </div>
                          </div>
                          <label htmlFor="detailKeyword" className="blind">입력</label>
                          <input id="detailKeyword" type="text" autoComplete="off" className="cont"/>  
                      </div>
                      <span className="break"></span>
                      <div className="box_col1">
                          <strong className="tit">작성자</strong>
                           <div className="has_ly">
                              <label htmlFor="srch_writer" className="blind">입력</label> 
                              <input id="srch_writer" type="text" autoComplete="off"/> 
                              <div className="ly_slct_member" style={{display: "none"}}>
                                  <ul>
                                     
                                  </ul>
                              </div>
                          </div>
                      </div>
                      <div className="box_col2 _searchPeriod">
                          <strong className="tit">기간</strong>
                          <div className="select_box">        
                              <button type="button" className="selected">
                                  <strong>직접입력</strong>
                              </button>
                              <div className="option_box" style={{display: "none"}}>
                                  <ul>
                                      <li>
                                          <button type="button" className="">
                                          전체
                                          </button>
                                      </li>
                                      <li>
                                          <button type="button" className="">
                                          1주
                                          </button>
                                      </li>
                                      <li>
                                          <button type="button" className="">
                                          1개월
                                          </button>
                                      </li>
                                      <li>
                                          <button type="button" className="">
                                          3개월
                                          </button>
                                      </li>
                                      <li>
                                          <button type="button" className="">
                                          6개월
                                          </button>
                                      </li>
                                      <li>
                                          <button type="button" className="">
                                          1년
                                          </button>
                                      </li>
                                      <li>
                                          <button type="button" className="sel">
                                          직접입력
                                          </button>
                                      </li>
                                  </ul>
                              </div>
                          </div>
                              <label htmlFor="srch_date_start" className="blind">시작 날짜</label>
                              <input id="srch_date_start" type="text" autoComplete="off" className="date-picker-input"/>
                              <span className="dash">-</span>
                              <label htmlFor="srch_date_finish" className="blind">종료 날짜</label>
                              <input id="srch_date_finish" type="text" autoComplete="off" className="date-picker-input">
                              </input>
                      </div>
                  </div>
                  <div className="fm">
                      <p>
                          <input id="chk_attfile" type="checkbox"/>
                          <label htmlFor="chk_attfile">첨부 파일 있음</label>
                      </p>
                      <p>
                          <input id="chk_comment" type="checkbox"/>
                          <label htmlFor="chk_comment">댓글 포함</label>
                      </p>
                      <button type="button" className="submit_detail">
                          검색
                      </button>
                  </div>
              </div>
          </div> 
          <div id="articleEditor">
              <div className="board_write">
                  <h2 className="blind">글쓰기</h2>
                  <form onSubmit={handleSubmit}>
                  <div className="task_area">
                      <div className="btn_task_wrap">
                          <button type="submit" className="btn_task tx_point">
                          등록
                        </button>
                      </div>
                      <div className="btn_task_wrap" >
                          <button type="button" className="btn_task">
                          임시저장
                        </button>
                      </div>
                      <button type="button" className="btn_write_fold">세부 설정</button>
                  </div>
                  <ul className="option">
                      <li className="opt_sbj">
                          <h3 className="tx">제목</h3>
                          <span className="wrap_sbj">
                          <input 
                            type="text" 
                            maxLength="200" 
                            placeholder="제목을 입력하세요" 
                            className="subject" 
                            name="title"
                            value={article.title}
                            onChange={(e) => setArticle({ ...article, title: e.target.value })}
                        />
                              <em className="cnt_txt">0/200</em>
                          </span>
                      </li>
                      <li className="opt_bd">
                      <h3 className="tx">게시판</h3>
                      <button type="button" className="btn_board_select">
                          게시판 선택
                      </button>
                      <span className="bd_name">
                          <span className="cate" >그린컴퓨터아카데미</span>
                          <strong>공지사항</strong>
                      </span>
                      </li>
                     
                      <li className="opt_file">
                          <h3 className="tx">파일첨부</h3>
                          <button type="button" className="btn_fold_attach close">
                              <i className="blind">첨부 파일 목록 열기</i>
                          </button>
                          <div className="lw_file_attach_write">
                              <div className="file_infor">
                                  <button type="button" className="btn_attach">
                                      내 PC
                                  </button>
                                  <button type="button" className="btn_attach">
                                      드라이브
                                  </button>
                                  <p className="total_volume">첨부파일 0개 (0KB)</p>
                              </div>

                          </div>
                      </li>
                  </ul>
                  <div className="workseditor-editor" style={{overflow: "auto", height: "auto"}}>
                  <Editor
                    apiKey='io6vv69eg9rs7jdt6rxcxtuwf127qkmot1d5e2ttm4khz10i'
                    initialValue={article.content}
                    init={{
                        height: 500,
                        forced_root_block: false, // IME 입력 문제를 해결
                        directionality: "ltr", // 텍스트 방향을 left-to-right로 설정
                        plugins: [
                        // Core editing features
                        'anchor', 'autolink', 'charmap', 'codesample', 'emoticons', 'image', 'link', 'lists', 'media', 'searchreplace', 'table', 'visualblocks', 'wordcount',
                        // Your account includes a free trial of TinyMCE premium features
                        // Try the most popular premium features until Dec 17, 2024:
                        'checklist', 'mediaembed', 'casechange', 'export', 'formatpainter', 'pageembed', 'a11ychecker', 'tinymcespellchecker', 'permanentpen', 'powerpaste', 'advtable', 'advcode', 'editimage', 'advtemplate', 'ai', 'mentions', 'tinycomments', 'tableofcontents', 'footnotes', 'mergetags', 'autocorrect', 'typography', 'inlinecss', 'markdown',
                        // Early access to document converters
                        'importword', 'exportword', 'exportpdf'
                        ],
                        toolbar: 'undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table mergetags | addcomment showcomments | spellcheckdialog a11ycheck typography | align lineheight | checklist numlist bullist indent outdent | emoticons charmap | removeformat',
                        tinycomments_mode: 'embedded',
                        tinycomments_author: 'Author name',
                        mergetags_list: [
                        { value: 'First.Name', title: 'First Name' },
                        { value: 'Email', title: 'Email' },
                        ],
                        ai_request: (request, respondWith) => respondWith.string(() => Promise.reject('See docs to implement AI Assistant')),
                    }}
                    onEditorChange={handleEditorChange}
                 
                    />
                  </div>
                  </form>
              </div>
              

          </div>  
                   
          </div>
      );
} 	

export default NoticeBoard;