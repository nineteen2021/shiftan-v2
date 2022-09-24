import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

export default function Question() {
    return (
        <div>
            <Typography sx={{mt:1, mb:1, ml:1}}>店舗責任者向け</Typography>
            <Accordion>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                >
                    <Typography>Q:Shiftanとは何ですか？</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography>
                        Shiftanとは飲食店を主に作られた無料のシフト作成アプリケーションです。
                        <br/>店長の方と従業員の方々にアカウント登録をしていただくとシフトの収集、作成、共有をおこなうことができます。
                    </Typography>
                </AccordionDetails>
            </Accordion>
            <Accordion>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                >
                    <Typography>Q:メールアドレスの変更はできませんか？</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography>
                        原則としてアカウントのメールアドレスは変更できません。
                        ですが、どうしてもということでしたらお問い合わせフォームでご連絡いただければ私たちの方で変更手続きを行わせていただきます。
                    </Typography>
                </AccordionDetails>
            </Accordion>
            <Typography sx={{mt:1, mb:1, ml:1}}>従業員向け</Typography>
            <Accordion>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                >
                    <Typography>Q:退会はどのように行えばよいですか？</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography>
                        アカウントの消去は現在まだ実装ができておりませんので、
                        データを消去したい場合にはお問い合わせフォームでご連絡いただければアカウントの消去を行わさせていただきます。
                    </Typography>
                </AccordionDetails>
            </Accordion>
            <Accordion>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                >
                    <Typography>Q:まず、最初にすることはなんですか？</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography>
                        アカウントをお作りになられたら、ホーム画面に店舗の登録のボタンが現れていると思います。
                        そのボタンから店長の方に店舗IDを伺い、入力してください。店長の方が認証することでシフトの提出を行えるようになります。
                    </Typography>
                </AccordionDetails>
            </Accordion>
        </div>
    )
}