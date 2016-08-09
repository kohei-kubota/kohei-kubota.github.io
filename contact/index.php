<?php
	if( $_SERVER['REQUEST_METHOD'] != "POST" && !isset($_POST['name']) && !isset($_POST['email']) && !isset($_POST['contents']) ) {
		header("Location: /");
		exit();
	}
	try {
		$name = htmlspecialchars($_POST['name']);
		$email = htmlspecialchars($_POST['email']);
		$contents = htmlspecialchars($_POST['contents']);

		mb_language('ja');
		mb_internal_encoding( "utf-8" );
		// 送信先（管理人のメールアドレス）
		$to = "";
		// 件名
		$subject = "ポートフォリオのお問合せフォームが送信されました。";
		// メールの本文
		$message = "
		■お問い合わせ内容
		￣￣￣￣￣￣￣￣￣￣￣￣￣￣￣￣￣￣￣￣￣￣￣￣￣￣￣￣￣￣￣￣￣￣￣￣￣
		\n名前: " . $name . 
		"\nメールアドレス: " . $email .  
		"\nメッセージ: " . $contents;
		// メール送信（mb_ マルチバイト、成功すれば true、失敗すれば return する）
		$header="From: " .mb_encode_mimeheader("ポートフォリオサイト") ."<>";
		//$header.="\n";
		//$header.="Cc:otoiawase@ml.gmo-ap.jp";
		// メール送信（mb_ マルチバイト、成功すれば true、失敗すれば return する）
		mb_send_mail($to, $subject, $message ,$header);



		//自動返信
		// $header="From: " .mb_encode_mimeheader("GMOアドマーケティング株式会社GMOSSP運営事務局") ."<support@coworkplace.jp>";
		// $tosubject = "【GMOアドマーケティング株式会社】お問合せ受付いたしました。";
		// $tomessage = "======================================================
		// 　※このメールはシステムより自動配信しております。
		// 　　返信は受付できませんのでご了承ください。
		// ======================================================

		// この度は、お問い合わせいただき誠にありがとうございます。
		// 担当者より追ってご連絡させていただきます。\n

		// ■お問い合わせ内容
		// ￣￣￣￣￣￣￣￣￣￣￣￣￣￣￣￣￣￣￣￣￣￣￣￣￣￣￣￣￣￣￣￣￣￣￣￣￣
		// \nサイト名称: " . $sitename . 
		// "\nサイトのURL: " . $siteurl .
		// "\n月間総ページビュー: " . $view . 
		// "\n広告掲載希望デバイス: " . $device . 
		// "\n広告枠のサイズ: " . $size . 
		// "\nNG業種: " . $ng . 
		// "\n区分: " . $businessform .
		// "\nお名前: " . $name .  
		// "\n会社名: " . $company .
		// "\n法人URL: " . $url . 
		// "\n所在地: " . $position . 
		// "\n電話番号: " . $tel . 
		// "\nメールアドレス: " . $email .  
		// "\nその他ご要望: " . $contents .
		// "\n利用規約: " . $agree ;
		// "\n--------------------------------------------------------------------------------------\n
		// GMOアドマーケティング株式会社
		// GMO AD Marketing Inc.

		// 〒150-0043東京都渋谷区道玄坂1丁目16番3号 渋谷センタープレイス
		// Shibuya Center Place

		// 　TEL:+81-3-5457-0909　FAX: +81-3-5457-0910
		// 　http://www.gmo-am.jp/
		// --------------------------------------------------------------------------------------";

		// mb_send_mail($email, $tosubject, $tomessage,$header);
	}
	catch (Exception $e)
	{
		print'ただ今障害により大変ご迷惑おかけしております。';
	}
?>
<!doctype html>
<html lang="ja">
<head>
<meta charset="utf-8">
<title>お問い合わせ｜Kohei Kubota｜Front End Engineer & Designer</title>
<!-- <link rel="shortcut icon" href="/favicon.ico" /> -->
<meta name="keywords" content="エンジニア,デザイナー">
<meta name="description" content="フロントエンドエンジニア・デザイナーのポートフォリオサイト">
<meta name="viewport" content="width=device-width,initial-scale=1.0">
<meta http-equiv="X-UA-Compatible" content="IE=edge"/>

<link rel="stylesheet" href="/css/reset.css">
<link rel="stylesheet" href="/css/style.css">
<link href="//netdna.bootstrapcdn.com/font-awesome/4.0.3/css/font-awesome.css" rel="stylesheet">
<link href='https://fonts.googleapis.com/css?family=Abril+Fatface' rel='stylesheet' type='text/css'>
<!--[if lt IE 9]>
<script src="http://html5shiv.googlecode.com/svn/trunk/html5.js"></script>
<![endif]-->
<script src="https://code.jquery.com/jquery-2.2.4.min.js" integrity="sha256-BbhdlvQf/xTY9gja0Dq3HiwQF8LaCRTXxZKRutelT44=" crossorigin="anonymous"></script>
<script src="/js/window-height.js"></script>
</head>
<body>
	<div class="contant-wrapper">
		<div class="my-work contact">
			<div class="contact-inner">
				<h1>Thank you for sending</h1>
				<h2>
					お問い合わせいただき誠にありがとうございます。<br>
					返信が必要な内容に関しては別途返信を差し上げます。
				</h2>
				<button onclick="location.href = '/'">TOP</button>
			</div>
		</div>
	</div>
</body>
</html>
