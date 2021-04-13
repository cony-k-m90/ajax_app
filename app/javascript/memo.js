function memo() {
  // => index.html.erb 「投稿する」ボタンの情報を取得
  const submit = document.getElementById("submit");
  // 投稿するボタンを「click」した場合に実行される関数を定義する
  submit.addEventListener("click", (e) => {
    // FromDataオブジェクトを生成 FormData(フォームの要素);
    const formData = new FormData(document.getElementById("form"));
    // 非同期通信実装に必要なXMLHttpRequestオブジェクトを生成
    const XHR = new XMLHttpRequest();
    //openでリクエストを初期化（openはどのようなリクエストをするのかを指定するメソッド）
    //HTTPメソッドはPOST、パスは/posts、非同期通信はtrue
    XHR.open("POST", "/posts", true);
    //返却されるデータ形式はjson
    XHR.responseType = "json";
    //メモ投稿のフォームに入力された情報を送信
    XHR.send(formData);
    //200以外のHTTPステータスが返却された場合の処理
    XHR.onload = () => {
      if (XHR.status != 200) {
        alert(`Error ${XHR.status}: ${XHR.statusText}`);
        return null;
      }
      //itemレスポンスとして返却されたメモのレコードデータ取得
      const item = XHR.response.post;
      //listHTMLを描画する場所を指定する際に使用する「描画する親要素」のlistの要素を取得
      const list = document.getElementById("list");
      //メモの入力フォームを取得(送信後に文字列を削除するため)
      const formText = document.getElementById("content");
      //「メモとして描画する部分のHTML」を定義している
      //HTMLという変数を描画するような処理を行えば、ここで定義したHTMLが描画される
      const HTML = `
        <div class="post" data-id=${item.id}>
          <div class="post-date">
            投稿日時：${item.created_at}
          </div>
          <div class="post-content">
          ${item.content}
          </div>
        </div>`;
      //listという要素に対して、insertAdjacentHTMLでHTMLを追加
      list.insertAdjacentHTML("afterend", HTML);
      //「メモの入力フォームに入力されたままの文字」は空の文字列に上書きされる
      formText.value = "";
    };
    //コントローラーのcreateアクションと、JavaScriptの処理が重複しているため投稿内容も重複してしまう
    //「submitボタンでclickする」というイベントを阻止する
    e.preventDefault();
  });
}
window.addEventListener("load", memo);