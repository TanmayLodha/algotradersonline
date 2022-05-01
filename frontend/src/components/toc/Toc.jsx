import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@mui/material";

import "./toc.scss";

function Toc() {
  useState(() => {
    document.title = "Terms of Use";
  }, []);

  return (
    <div className="main-t">
      <div className="top">
        <Link to="/" className="link">
          <h1>algoTrade.</h1>
        </Link>
      </div>
      <div className="bottom">
        <div className="head">
          <h2>AGREEMENT / DISCLAIMER / TERMS & CONDITIONS OF USE</h2>
          <h5>IMPORTANT – PLEASE READ CAREFULLY</h5>
        </div>
        <div className="para">
          <p>
            We one of several internet enthusiasts who trade in stocks in cash
            segment of NSE and BSE and invest in mutual funds. We discuss them
            here to educate my blog readers to help them identify the right
            stock to invest in, at the right price and when is the right time to
            exit. We share contract notes openly to be transparent with my blog
            readers and it isn’t to recommend stock.When we investing in any
            stock or has invested in the past, we believe we are more likely to
            make sense and less likely to say speak stupid. We share them if and
            only if we have an investment or traded in them. If we post
            something here that you find helpful as you build or manage your
            portfolio, that’s wonderful but do not consider it as a financial
            advise.
          </p>

          <p>
            We am <strong>NOT</strong> a SEBI registered advisor or a financial
            adviser.
          </p>

          <p>
            Any of my investment or trades we share on my blog are provided for
            educational purposes only and do not constitute specific financial,
            trading or investment advice. The blog is intended to provide
            educational information only and does not attempt to give you advice
            that relates to your specific circumstances. You should discuss your
            specific requirements and situation with a qualified financial
            adviser. We do share details and numbers available in the public
            domain for any company or on the websites of NSE and BSE.
          </p>

          <p>
            Any Advice or information on this website is general advice for
            education purpose only and does not take into account your personal
            circumstances, please do not trade or invest based solely on this
            information. By Viewing any material or using the information within
            this site you agree that this is general education material and you
            will not hold any person or entity responsible for loss or damages
            resulting from the content or general advice provided here.
          </p>

          <p>
            Equities, Futures, options, and currency trading have large
            potential rewards, but also large potential risk. You must be aware
            of the risks and be willing to accept them in order to trade or
            invest in markets. Don’t trade with money you can’t afford to lose.
            The past performance of any trading system or methodology is not
            necessarily indicative of future results.
          </p>
        </div>
        <Link to="/" className="text">
          <Button className="btn" variant="contained">
            GO TO HOME
          </Button>
        </Link>
      </div>
    </div>
  );
}

export default Toc;
