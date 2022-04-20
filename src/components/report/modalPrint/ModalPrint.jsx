import React from "react";
import { render } from "react-dom";
import { useReactToPrint } from "react-to-print";
import { Grid, Paper, Box } from "@mui/material";
import { styled } from "@mui/material/styles";
import "./modalPrint.scss";

const Item = styled(Grid)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
}));

class ModalPrint extends React.Component {
  render() {
    return (
      <div className="medai">
        <Paper
          sx={{
            p: 4,
            margin: "auto",
            maxWidth: "100vh",
            height: "auto",
            flexGrow: 1,
            backgroundColor: (theme) =>
              theme.palette.mode === "dark" ? "#1A2027" : "#fff",
          }}
        >
          <Box sx={{ flexGrow: 1 }}>
            <Grid item xs={12} md={12} className="Box">
              <Item>
                <img
                  // alt="complex"
                  width="100px"
                  height="100px"
                  src={require("../../../image/0riginal-logo.png")}
                />
              </Item>
              <Item>
                <Grid item sx={{ textAlign: "center" }}>
                  <div className="moul-style">ព្រះរាជាណាចក្រកម្ពុជា</div>
                  <div className="moul">Kingdom of Cambodia</div>
                  <div className="moul-style">ជាតិ សាសនា ព្រះមហាក្សត្រ</div>
                  <div className="moul">Nation Religion King</div>
                  <font face="Wingdings 2" className="font-symbol">
                    <font face="Symbol">
                      &#8722;&#8722;&#8722;&#8722;&#8722;
                    </font>
                    &#104;&#101;&#99;&#98;&#10041;&#97;&#100;&#102;&#103;
                    <font face="Symbol">
                      &#8722;&#8722;&#8722;&#8722;&#8722;
                    </font>
                  </font>
                </Grid>
                <Grid item sx={{ textAlign: "center" }}>
                  <div className="moul-style">
                    របាយការណ៍ប្រចាំត្រីមាស
                    <br /> របាយការណ៍ប្រចាំត្រីមាស
                    <br /> សូមគោរពជូន
                    <br />
                    ប្រធានកិច្ចការរដ្ឋបាល និងហិរញ្ញវត្ថុ
                  </div>
                </Grid>
              </Item>
            </Grid>
          </Box>

          <Grid container padding={4}>
            <Grid item xs={12} container display="flex">
              <Grid item>
                <p>
                  <i className="Bokor">កម្មវត្ថុ៖ </i>អំពីលទ្ធផលការងារ
                  និងសកម្មភាពប្រចាំត្រីមាស
                </p>
                <p>
                  &emsp;&emsp;&emsp;សេចក្តីដូចបានចែងក្នុងកម្មវត្ថុខាងលើ
                  ខ្ញុំបាទមានកិត្តិយសសូមជម្រាប ប្រធានកិច្ចការរដ្ឋបាល
                  និងហិរញ្ញវត្ថុ
                  <br />
                  មេត្តាជ្រាបថា ចាប់ពីថ្ងៃទី០១ ខែវិច្ឆិកា ឆ្នាំ២០២១ រហូតដល់
                  ថ្ងៃទី៣0 ខែវិច្ឆិកា ឆ្នាំ២០២១ តាមផ្នែកនីមួយៗបានធ្វើ
                  <br />
                  កិច្ចការទទួលបានលទ្ធផលដូចតទៅ៖
                </p>
              </Grid>
              <Grid item sx={{ display: "flex", marginTop: 2 }}>
                <b className="size-num">1.</b>
                <div className="moul-style">
                  ការិយាល័យព័ត៌មានវិទ្យា និងទីផ្សារ
                </div>
                <div>/IT&Marketing Office</div>
              </Grid>
              <Grid itemsx={{ marginTop: 2 }}>
                <p className="bold-style">1.1.ផ្នែកបច្ចេកទេសព័ត៌មានវិទ្យា</p>

                <p>
                  &emsp;&emsp;ផ្នែកបច្ចេកទេសព័ត៌មានវិទ្យា គឺបានគ្រប់គ្រងទិន្នន័យ
                  សម្របសម្រួលរាល់បញ្ហាបច្ចេកទេសព័ត៌មានវិទ្យា ដូចជា៖
                </p>
                <p>
                  - រៀបចំ Permission Access Folder ជូន Information Office,
                  <br />
                  &ensp;Financial, Administrative
                  <br />
                  - តម្លើង OS កុំព្យូទ័រគណនេយ្យ
                  <br />
                  &ensp;Wireless មិនបាន
                  <br />
                  - ជួសជុល Finger Print ជូនផ្នែករដ្ឋបាល
                  <br />
                  - រៀបចំបច្ចេកទេស Slide រៀនតាមអនឡាញនៅបន្ទប់B22 និងB23
                  <br />
                </p>
              </Grid>
              <Grid item>
                <Grid item sx={{ display: "flex", marginTop: 2 }}>
                  <p className="bold-style">1.2.អភិវឌ្ឍកម្មវិធី</p>
                </Grid>

                <p>
                  &emsp;&emsp;ការអភិវឌ្ឍកម្មវិធី
                  គឺបានធ្វើឡើងក្នុងការបង្កើតកម្មវិធី (App, Website, System)
                  ក្រុមការងារបង្កើតកម្មវិធីមួយចំនួនមានដូចខាងក្រោម៖
                </p>
                <p>
                  - Develop Mart Management System (100%)
                  <br />
                  - Add Khmer language to School Fees web page for QR Code
                  <br />
                  &ensp;Scanner
                  <br />
                  - Update Website TV
                  <br />
                  - Student Pick-Up System (70%)
                  <br />
                </p>
              </Grid>
              <Grid item sx={{ marginTop: 2 }}>
                <p className="bold-style">1.3. ផ្នែកទីផ្សារ</p>
                <p>
                  &emsp;&emsp;ផ្នែកទីផ្សារ
                  គឺជាការផ្សព្វផ្សាយទៅលើអតិថិជនគោលដៅរបស់សាលា
                  ហើយបង្កើនការផ្សព្វផ្សាយទៅលើស្លាកយីហោរបស់ក្រុមហ៊ុន
                  លើបណ្ដាញសង្គម (Digital Marketing)
                  និងពង្រីកការផ្សព្វផ្សាយសេវាកម្មថ្មីៗរបស់សាលា។
                </p>
              </Grid>
              <br />
              <Grid item sx={{ marginTop: 2 }}>
                <p className="bold-style">1.3.1. ការផ្សព្វផ្សាយ</p>
                <p>
                  &emsp;&emsp;ផ្នែកបច្ចេកទេសព័ត៌មានវិទ្យា គឺបានគ្រប់គ្រងទិន្នន័យ
                  សម្របសម្រួលរាល់បញ្ហាបច្ចេកទេសព័ត៌មានវិទ្យា ដូចជា៖
                </p>

                <p>
                  - រៀបចំ Permission Access Folder ជូន Information Office,
                  <br />
                  &ensp;Financial, Administrative
                  <br />
                  - តម្លើង OS កុំព្យូទ័រគណនេយ្យ
                  <br />
                  &ensp;Wireless មិនបាន
                  <br />
                </p>
              </Grid>
              <Grid item xs={12} sx={{ marginTop: 2 }}>
                <hr className="line-style" />
              </Grid>
              <Grid item container xs={12} sx={{ marginTop: 2 }}>
                <Grid item>
                  <p className="footer-style" sx={{ marginBottom: 2 }}>
                    ភូមិថ្មី សង្កាត់ស្វាយដង្គំ ក្រុងសៀមរាប ខេត្តសៀមរាប
                    ព្រះរាជាណាចក្រកម្ពុជា/Thmey Village, Svay Dangkum, Siem Reap
                    Cambodia.
                    <wbr /> ទូរស័ព្ទៈ 017 604 426, 063 50600 999, 063 5066
                    888/E-mail: info@go-globalschool.com/www.go-globalschool.com
                  </p>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Paper>
      </div>
    );
  }
}

export default ModalPrint;
