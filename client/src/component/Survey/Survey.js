import React from "react";

import LogoBH from "./../../images/logobh.png";
import "./Survey.css"
const Survey = () => {
    return (
        <>
        <div id="survey">
        <div><img className="logo" src={LogoBH} width={300}/></div>
        <h1 className="title">סקר חוזה/תכנון לוח</h1>
        <h1>{"1.פרטי הפרויקט/מרכז: "}</h1>
        <table>
            <thead></thead>
            <tbody>
                <tr>
                    <td>{"שם העורך: "}</td>
                    <td><input type="text" className="form-control"/></td>
                    <td>{"תאריך: "}</td>
                    <td><input type="date" className="form-control"/></td>
                </tr>
                <tr>
                    <td>{"שם הלוח: "}</td>
                    <td><input type="text" className="form-control"/></td>
                    <td>{"מס לוח: "}</td>
                    <td><input type="text" className="form-control"/></td>
                </tr>
                <tr>
                    <td>{"שם הלקוח: "}</td>
                    <td><input type="text" className="form-control"/></td>
                    <td>{"שם הפרויקט: "}</td>
                    <td><input type="text" className="form-control"/></td>
                </tr>
                <tr>
                    <td>{"איש קשר: "}</td>
                    <td><input type="text" className="form-control"/></td>
                    <td>{"טלפון: "}</td>
                    <td><input type="text" className="form-control"/></td>
                </tr>
                <tr>
                    <td>{"מספר עבודה שלנו: "}</td>
                    <td colSpan={4}><input type="text" className="form-control"/></td>
                </tr>
                <tr>
                    <td>{"זמן אספקה: "}</td>
                    <td><input type="text" className="form-control"/></td>
                    <td>{"תנאי תשלום: "}</td>
                    <td><input type="text" className="form-control"/></td>
                </tr>
                <tr>
                    <td>{"סוג הציוד בלוח: "}</td>
                    <td colSpan={4}><input type="text" className="form-control"/></td>
                </tr>
                <tr>
                    <td colSpan={2}><input  type="checkbox" checked/>{' ת"י - '}<input type="text" className="form-control" maxlength="1" size="1"/>{'-61439'}</td>
                    <td colSpan={2}><input type="checkbox" checked/>{'SYSTEM:'}  <input type="text" className="form-control"/> </td>
                </tr>
            </tbody>
        </table>

        <br/><br/><br/>
        <h1>{"2.נתונים ללוח: "}</h1>
        <table>
            <thead>
                <tr>
                    <td>מס</td>
                    <td>תיאור</td>
                    <td>הגדרה</td>
                    <td>פרוט</td>
                    <td>הערה</td>
                </tr>
            </thead>
            <tbody>
                {/* Start נתוני המסד */}
                <tr>
                    <td rowSpan={13}>נתוני המסד </td>
                    <td>מסך (מבנה)</td>
                    <td></td>
                    <td>IEC62208</td>
                    <td><input type="text"/></td>
                </tr>
                <tr>
                    <td>צבע</td>
                    <td></td>
                    <td>RAL7035</td>
                    <td><input type="text"/></td>
                </tr>
                <tr>
                    <td>תוצרת דגם</td>
                    <td></td>
                    <td></td>
                    <td><input type="text"/></td>
                </tr>
                <tr>
                    <td>דלתות בחזית</td>
                    <td></td>
                    <td>
                    <select name="yesno" id="yesno">
                        <option value="yes">כן</option>
                        <option value="no">לא</option>
                    </select>
                    </td>
                    <td><input type="text"/></td>
                </tr>
                <tr>
                    <td>פנלים</td>
                    <td></td>
                    <td>
                    <select name="yesno" id="yesno">
                        <option value="yes">כן</option>
                        <option value="no">לא</option>
                    </select>
                    </td>
                    <td><input type="text"/></td>
                </tr>
                <tr>
                    <td>מידות (נישה) mm</td>
                    <td>HxWxD</td>
                    <td>
                    <input type="text" className="form-control" maxlength="4" size="4"/>x<input type="text" className="form-control" maxlength="4" size="4"/>x<input type="text" className="form-control" maxlength="4" size="4"/>
                    </td>
                    <td><input type="text"/></td>
                </tr>
                <tr>
                    <td>משקל</td>
                    <td>Kg</td>
                    <td>
                    Kg<input type="text" className="form-control" maxlength="4" size="4"/>
                    </td>
                    <td><input type="text"/></td>
                </tr>
                <tr>
                    <td>מידור</td>
                    <td>(Form)</td>
                    <td>Form 1</td>
                    <td>W311</td>
                </tr>
                <tr>
                    <td>דרגת הגנה</td>
                    <td>IPXX</td>
                    <td>IP20B(finger proof)</td>
                    <td>W312</td>
                </tr>
                <tr>
                    <td>דרגת הגנה מהלם מכאני</td>
                    <td>IK</td>
                    <td>10</td>
                    <td><input type="text"/></td>
                </tr>
                <tr>
                    <td>ריצפת הלוח</td>
                    <td></td>
                    <td>
                    <select name="yesno" id="yesno">
                        <option value="yes">כן</option>
                        <option value="no">לא</option>
                    </select>
                    </td>
                    <td><input type="text"/></td>
                </tr>
                <tr>
                    <td>צוקל (בסיס)</td>
                    <td></td>
                    <td>
                    <select name="yesno" id="yesno">
                        <option value="yes">כן</option>
                        <option value="no">לא</option>
                    </select>
                    </td>
                    <td>בשטח</td>
                </tr>
                <tr>
                    <td>גילוי-אש</td>
                    <td></td>
                    <td>הכנה בלבד</td>
                    <td><input type="text"/></td>
                </tr>
                {/* END נתוני המסד */}

                {/* Start התקנה */}
                <tr>
                    <td rowSpan={12}>התקנה</td>
                    <td>שימוש/מיקום</td>
                    <td></td>
                    <td>הכנסה בלבד</td>
                    <td><input type="text"/></td>
                </tr>
                <tr>
                    <td>סוג ההתקנה</td>
                    <td></td>
                    <td>פנימי-(חדר חשמל מסדרון?)</td>
                    <td><input type="text"/></td>
                </tr>
                <tr>
                    <td>גישה ללוח </td>
                    <td></td>
                    <td>חד צדדי</td>
                    <td>דו צדדי</td>
                </tr>
                <tr>
                    <td>סוג הלוח</td>
                    <td></td>
                    <td>נייח</td>
                    <td><input type="text"/></td>
                </tr>
                <tr>
                    <td>הגנה בפני חשמול</td>
                    <td></td>
                    <td>ישיר+עקיף</td>
                    <td><input type="text"/></td>
                </tr>
                <tr>
                    <td>מפעילים</td>
                    <td></td>
                    <td>מיומנים בלבד</td>
                    <td><input type="text"/></td>
                </tr>
                <tr>
                    <td>שיטת החיבור בלוח</td>
                    <td></td>
                    <td><input type="checkbox"/>{"-3Pole"}</td>
                    <td><input type="checkbox"/>{"-4Pole"}</td>
                </tr>
                <tr>
                    <td>כניסת כבלים</td>
                    <td></td>
                    <td>
                    <select name="topbottom" id="topbottom">
                        <option value="top">מלמעלה</option>
                        <option value="bottom">מלמטה</option>
                    </select>
                    <select>
                        <option value="נחושת">נחושת</option>
                        <option value="אלומניום">אלומניום</option>
                        <option value='פ"צ'>פ"צ</option>
                    </select>
                    </td>
                    <td>{"כמות ושטח חתך: "} <input type="text"/></td>
                </tr>
                <tr>
                    <td>יציאת כבלים</td>
                    <td></td>
                    <td>
                    <select name="topbottom" id="topbottom">
                        <option value="top">מלמעלה</option>
                        <option value="bottom">מלמטה</option>
                    </select>
                    <select>
                        <option value="נחושת">נחושת</option>
                        <option value="אלומניום">אלומניום</option>
                    </select>
                    </td>
                    <td><input type="text"/></td>
                </tr>
                <tr>
                    <td>מוזן מלוח</td>
                    <td></td>
                    <td><input type="text"/></td>
                    <td><input type="text"/></td>
                </tr>
                <tr>
                    <td>מס מעגל, שטח חתך</td>
                    <td></td>
                    <td><input type="text"/></td>
                    <td><input type="text"/></td>
                </tr>
                <tr>
                    <td>הגנה מזרם קצר בלוח</td>
                    <td>SCPD</td>
                    <td>
                    <select name="onoff" id="onoff">
                        <option value="on">מפסק</option>
                        <option value="off">מנתק</option>
                    </select>
                    </td>
                    <td>דגם: <input type="text"/></td>
                </tr>
                <tr></tr>
                {/* END התקנה */}

                {/* Start נתונים טכניים */}
                <tr>
                    <td rowSpan={16}>נתונים טכניים</td>
                    <td>מקדם העמסה</td>
                    <td>R.D.F</td>
                    <td>טבלה/חישוב</td>
                    <td>W310</td>
                </tr>
                <tr>
                    <td>תנאי סביבה</td>
                    <td></td>
                    <td>רגילים</td>
                    <td><input type="text"/></td>
                </tr>
                <tr>
                    <td>טמפ' סביבה</td>
                    <td></td>
                    <td>35C</td>
                    <td></td>
                </tr>
                <tr>
                    <td>זרם קצר צפוי</td>
                    <td>Icp</td>
                    <td>KA  <input type="text" className="form-control" maxlength="4" size="4"/></td>
                    <td><input type="text"/></td>
                </tr>
                <tr>
                    <td>יכולת עמידה בזרם רגעי</td>
                    <td>Icw/Icc</td>
                    <td>KA  <input type="text" className="form-control" maxlength="4" size="4"/></td>
                    <td><input type="text"/></td>
                </tr>
                <tr>
                    <td>יכולת עמידה בזרם שיא</td>
                    <td>Ipk</td>
                    <td>KA  <input type="text" className="form-control" maxlength="4" size="4"/></td>
                    <td>W306</td>
                </tr>
                <tr>
                    <td>זרם של הלוח</td>
                    <td>InA</td>
                    <td><input type="text" className="form-control" maxlength="4" size="4"/>  A  <input type="text" className="form-control" maxlength="4" size="4"/></td>
                    <td><input type="text"/></td>
                </tr>
                <tr>
                    <td>מתח הפעלה</td>
                    <td>Ue</td>
                    <td>400V</td>
                    <td><input type="text"/></td>
                </tr>
                <tr>
                    <td>מתח פיקוד 1</td>
                    <td>Us1</td>
                    <td>230V - AC (DC)</td>
                    <td><input type="text"/></td>
                </tr>
                <tr>
                    <td>מתח פיקוד 2</td>
                    <td>Us2</td>
                    <td>24V - AC (DC)</td>
                    <td><input type="text"/></td>
                </tr>
                <tr>
                    <td>תדר</td>
                    <td>fn (Hz)</td>
                    <td>50Hz</td>
                    <td><input type="text"/></td>
                </tr>
                <tr>
                    <td>שיטת הארקה במתקן</td>
                    <td></td>
                    <td>TN-C-S/TN-S</td>
                    <td>{"כמות ושטח חתך: "} <input type="text"/></td>
                </tr>
                <tr>
                    <td>תאימות אלקטרומגנטית</td>
                    <td>EMC</td>
                    <td>A (תעשייתי)</td>
                    <td><input type="text"/></td>
                </tr>
                <tr>
                    <td>עמידה במתח הבדדה</td>
                    <td>Ui(V)</td>
                    <td>a {"300"} &#60; Ui &#8804; {"690"}</td>
                    <td>W307</td>
                </tr>
                <tr>
                    <td>עמידה במתח הלם</td>
                    <td>Uimp(V)</td>
                    <td>(לוח מישני/ראשי) 6KV/4KV</td>
                    <td>W308,W315</td>
                </tr>
                <tr>
                    <td>דרגת זיהום</td>
                    <td></td>
                    <td> 3- תעשיתי</td>
                    <td>אזור משרדי-2</td>
                </tr>
                <tr></tr>
                {/* END נתונים טכניים */}

                
                {/* Start מידע */}
                <tr>
                    <td rowSpan={6}>מידע</td>
                    <td>חווט</td>
                    <td></td>
                    <td>סטנדרט מפעלי</td>
                    <td><input type="text"/></td>
                </tr>
                <tr>
                    <td>סימון בתוך הלוח</td>
                    <td></td>
                    <td>סטנדרט מפעלי</td>
                    <td><input type="text"/></td>
                </tr>
                <tr>
                    <td>זיהוי על הדלת</td>
                    <td></td>
                    <td>סטנדרט מפעלי</td>
                    <td><input type="text"/></td>
                </tr>
                <tr>
                    <td>כיתוב בשפה</td>
                    <td></td>
                    <td>עברית</td>
                    <td><input type="text"/></td>
                </tr>
                <tr>
                    <td>שילוט מחומר סוג/חומר</td>
                    <td></td>
                    <td>פלסטיק</td>
                    <td><input type="text"/></td>
                </tr>
                <tr>
                    <td>דיאגראמה (סינופטית)</td>
                    <td></td>
                    <td>אין</td>
                    <td><input type="text"/></td>
                </tr>
                {/* END מידע */}

                {/* Start הובלה */}
                <tr>
                    <td rowSpan={3}>הובלה</td>
                    <td>סוג אריזה</td>
                    <td></td>
                    <td>סטנדרט מפעלי</td>
                    <td><input type="text"/></td>
                </tr>
                <tr>
                    <td>הובלה בחלקים</td>
                    <td></td>
                    <td>
                    <select name="yesno" id="yesno">
                        <option value="yes">כן</option>
                        <option value="no">לא</option>
                    </select>
                    </td>
                    <td><input type="text"/></td>
                </tr>
                <tr>
                    <td>שיטת הרמה</td>
                    <td></td>
                    <td>מלמטה</td>
                    <td><input type="text"/></td>
                </tr>
                
                {/* END הובלה */}
            </tbody>
        </table>
        
        <br/>
        <table>
            <thead></thead>
            <tbody>
                <tr>
                    <td>יחס מוליך N ל פאזה:</td>
                    <td colSpan={2}><input type="checkbox"/>{"-100%"}</td>
                    <td><input type="checkbox"/>{"-50%"}</td>
                    <td rowSpan={2}>טבלה W305</td>
                </tr>
                <tr>
                    <td>יחס מוליך PE ל פאזה:</td>
                    <td><input type="checkbox"/>{"-100%"}</td>
                    <td><input type="checkbox"/>{"-50%"}</td>
                    <td><input type="checkbox"/>{"-25%"}</td>
                </tr>
            </tbody>
        </table>

        <br/><br/><br/>
        <h1>{"3.הערות נוספות: "}</h1>
        <table>
            <thead></thead>
            <tbody>
                <tr>
                    <td>1. עליית טמפ':</td> 
                    <td><input type="checkbox"/>{"-נדרש השוואה"} <input type="checkbox"/>{"-חישוב"}</td>
                </tr>
                <tr>
                    <td>2. ציוד שסופק ע"י הלקוח: </td>
                    <td><input type="text"/></td>
                </tr>
                <tr>
                    <td>3. ציוד צדידה:</td> 
                    <td><input type="text"/></td>
                </tr>
                <tr>
                    <td>4. בקר קבלים:</td> 
                    <td><input type="text"/></td>
                </tr>
            </tbody>
        </table>
        </div>

    <button onClick={()=>{
        var myPrint = document.getElementById("survey").innerHTML;
        var orginal = document.body.innerHTML;
        document.body.innerHTML=myPrint;
        window.print();
        document.body.innerHTML=orginal;

    }}>print</button>
    </>
    )
}

export default Survey;