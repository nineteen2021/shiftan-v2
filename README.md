# Shiftan（シフト管理業務補助アプリ）
![image](https://user-images.githubusercontent.com/84577532/202179477-766ef36e-3463-4b27-80a9-fb481b0198c9.png)
技育展登壇用スライド: https://docs.google.com/presentation/d/1Akfkf7ZtehgYBxIZ36l0LURtK4Hk89z9VLFWCwWnZ6Q/edit#slide=id.g13cf339ed51_2_72
技育展で頂いたフィードバック:https://docs.google.com/spreadsheets/d/11v8Uxg2MD86KlIXFQZIWBLcNgak1l6HVWH_7wiTbbx4/edit#gid=1919178158

## 概要
Shiftanは飲食店等のシフト管理業務を補助するwebアプリです。  
もともと知人のアルバイト先の店長がシフトの作成に1週間かかっているという課題があり、それを解決するために開発を行っています。
その中で[しふたん（自動シフト表作成アプリ）](https://github.com/JinA293/shiftan)を開発しましたが、店舗に導入できず課題の解決に至らなかったためにもう一度チームでShiftanの開発を始めました。

## こだわり・特徴
- ユーザーインタビュー及び要件定義書の作成    
→以前に開発した[しふたん（自動シフト表作成アプリ）](https://github.com/JinA293/shiftan)が使われることはなかったという経験から実際に使われるようなアプリを作成するためにまずニーズの調査を行う必要があると思い、 ユーザーインタビュー及び要件定義書の作成を行いました。ユーザーインタビューは飲食店を10店舗ほど[アンケート用紙](https://docs.google.com/document/d/1wdV-k2p5ARnZDpvUdYddqPEyQ_UZZqJNLoPtqve4Acc/edit)を用いて行い、その結果からユーザーが欲しい機能やそうでない機能などを整理した要件定義書を作成しました。
- エンジニアだけではないチーム構成  
→非エンジニア向けのサービスには非エンジニアからの視点が必要と考え、デザイナーとして友人に一人参加してもらいました。加えて要件定義書を作成している間に、ワイヤーフレーム（[店舗アカウント側](https://docs.google.com/presentation/d/1bi_nSf33mQr-pYzcKSBjTmDUwPTtY3I2AaoxxBYcIZQ/edit#slide=id.g1192b37378e_1_3)と[スタッフ側](https://docs.google.com/presentation/d/1dPcIvxoYT50RsayeSwHm5uxTjny3unSkJD1ZxsDzmWU/edit#slide=id.g11f3e2fd5a0_0_218)）とファビコンの作成をお願いしました。
- シンプルなUI・UXの構築  
→パソコンが苦手な人でも使いやすいと感じてもらえるように、配色やボタンの数を減らすことに気を付けました。

## 開発期間・人数
開発期間:9か月（2022/2-2022/11)  
開発人数:5人（エンジニア:4人, デザイナー:1人）  
- [＠JinA293](https://github.com/JinA293) 
- [@KaedeNozawa](https://github.com/KaedeNozawa)
- [＠koki-fore](https://github.com/koki-fore)
- [＠yamato3010](https://github.com/yamato3010)  
（アルファベット順）

## 使用技術
![image](https://user-images.githubusercontent.com/84577532/202180920-0258aac5-38fb-40ab-a738-dd39cb4421e5.png)
#### Front : JavaScript(React), HTML/CSS, MaterialUI  
#### Back : Python(Django)  
#### DB : MySQL  
#### Infrastructure: AWS(EC2)
#### TaskManagement : Trello, Miro etc.  
### ER図
![image](https://user-images.githubusercontent.com/84577532/202622388-ba393a81-4821-4919-9afb-1c21bee81040.png)

## どのように動くか

### 店舗マネージャーアカウントでのみ使える機能
- シフト編集
- シフト作成
- スタッフのポジション編集

### 店舗スタッフアカウントのみ使える機能
- 希望シフト提出

### どちらのアカウントでも使える機能
- シフト一覧閲覧
- アカウント編集（パスワード変更などを含む）

## 困難だった点とどう乗り越えたか
- 新技術の導入  
→React, Django, Docker, WSL, AWSなどの新技術に挑戦しました。どれも全く触ったことがなくキャッチアップにとても苦労したうえ、初めて中規模のプロダクトを開発したため時間がかかりました。3人で技術書やネット上のドキュメントを調べ、共有してタスクをフロント→バック→インフラの順に消費し乗り越えました。特に非同期処理・状態管理などが難しく、Udemyの講座なども参考に学習を進めました。
読んだ技術書:現場で使えるDjangoRestFrameworkの教科書、React実践の教科書など
- ログイン機能の実装  
→ログイン機能をDRFを使い、一から構築しました。非同期処理について細かく勉強することで乗り越えました。JWTトークンはローカルストレージに保存しています。デメリットとしてはXSSによるトークン漏洩の可能性が高いことが挙げられますが、トークンに有効期限を設けることによって危険性を軽減しています。

## 展望
- 店舗への導入  
→もともと導入予定の店舗といくつかユーザーインタビューをした店舗に許可を頂き、Shiftanを導入する予定です。実際に使っていただきフィードバックを頂きさらなるプロダクトの改善を目指します。
- リファクタリング    
→わかりづらい変数名やファイル名が存在しているのでリファクタリングを行い、プログラムの可読性の向上に努めます。
- 保守・運用  
→現時点だとエンジニアの半分が先に卒業するため、サービスの開発を終了する可能性が高いです。導入予定の店舗で利用が可能であるなどニーズがある、もしくは収益化が可能であれば保守・運用を継続して行っていく可能性はあります。
