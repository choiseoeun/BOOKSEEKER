const express = require('express');
const router = express.Router();
const Youtube = require('youtube-node');
const youtube = new Youtube();



//=================================
//             URL Search
//=================================
router.post('/urlsearch',(req,res) => {

const URL = req.body.URL // 검색할 url
var limit = 5;  // 출력 갯수

console.log("api에서 출력한 결과 : ", URL)

youtube.setKey('AIzaSyDCwHsZdvktc9-M_hZYkQOKXyRxAjMuEQI'); // API 키 입력

youtube.search(URL, limit, function (err, result) { // 검색 실행
   // 에러일 경우 에러공지하고 빠져나감
    if (err) { console.log(err);
        console.log("왜이래~");
        return res.json({
            isSearchSuccess: false,
            message: "video not found"
        })
    }

    else{
        //console.log(JSON.stringify(result, null, 2)); // 받아온 전체 리스트 출력
          var items = result["items"]; // 결과 중 items 항목만 가져옴
          for (var i in items) { 
              var it = items[i];
             var title = it["snippet"]["title"];
              var video_id = it["id"]["videoId"];
              var url = "https://www.youtube.com/watch?v=" + video_id;
              console.log("제목 : " + title);
              console.log("URL : " + url);
              console.log("-----------");

              if(url===URL){
                return res.json({
                    isSearchSuccess: true,
                    message: "videofound"
                });
              }
            
        }
    }
    })
})


module.exports = router;