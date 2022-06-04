import React from 'react';
import styled from 'styled-components';

//아이콘
import { FcGoogle } from 'react-icons/fc';
import { BsInstagram, BsGithub } from 'react-icons/bs';
import { footerLogo } from '../asset/image/index';

const Footer = () => {
  return (
    <Wrap>
      <div className="innerWrap">
        <div className="topWrap">
          <div className="LogoWrap">
            <img src={footerLogo} alt="logo" className="footerLogo" />
          </div>
          <ul className="linkWrap">
            <li>Satisfaction</li>
            <li>Error report</li>
            <li>Privacy</li>
          </ul>
        </div>

        <div className="bottomWrap">
          <div className="textWrap">
            <p className="text">
              This is a service created through Hanghae 99.
              <br /> Please try it, and leave feedback on any positive or
              uncomfortable points.
              <br /> Have a nice day. <span>😽</span>
            </p>
          </div>

          <ul className="linkIcons">
            <li className="icon" onClick={() => {}}>
              <a href="mailto:officialfriengls@gmail.com">
                <FcGoogle className="googleIcon" />
              </a>
            </li>
            <li
              className="icon"
              onClick={() => {
                window.open('https://www.instagram.com/friengls/');
              }}
            >
              <BsInstagram className="instaIcon" />
            </li>
            <li
              className="icon"
              onClick={() => {
                // window.open('https://깃허브 링크/');
              }}
            >
              <BsGithub className="githubIcon" />
            </li>
          </ul>
        </div>

        <span className="line" />
        <div className="copyright">
          Copyright @2022 Friengls. All rights reserved.
        </div>
      </div>
    </Wrap>
  );
};

export default Footer;

const Wrap = styled.div`
  width: 100%;
  height: 280px;
  background: #262626;

  .innerWrap {
    width: 100%;
    max-width: 1280px;
    height: 100%;
    margin: auto;
    padding: 30px 0 0 0;

    /* background: #8d8d8d71; */

    .topWrap {
      max-width: 1150px;
      width: 100%;
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0 24px;
      margin: auto;

      .LogoWrap {
        width: 160px;
        width: 190px;
        height: 45px;
        padding-top: 10px;

        .footerLogo {
          width: 100%;
        }
      }

      .linkWrap {
        width: 270px;
        display: flex;
        justify-content: space-between;

        li {
          font-size: 12px;
          font-size: 14px;
          color: #848484;
          cursor: pointer;
        }
        li:hover {
          color: #fff;
        }

        li:last-child::after {
          display: none;
        }
        li::after {
          content: '';
          display: inline-block;
          width: 1px;
          height: 10px;
          /* margin-left: 23px; */
          margin-left: 17px;
          background-color: #5e5e5e;
        }
      }
    }

    .bottomWrap {
      max-width: 1150px;
      width: 100%;
      display: flex;
      justify-content: space-between;
      margin-top: 18px;
      /* margin: 18px auto 0; */
      margin: 22px auto 0;
      padding: 0 24px;

      .textWrap {
        .text {
          /* width: 510px; */
          width: 560px;
          height: 66px;
          /* font-size: 14px; */
          font-size: 16px;
          font-weight: 500;
          margin-top: 12px;
          margin-top: 18px;
          color: #c9c9c9;

          span {
            font-size: 18px;
          }
        }
      }

      .linkIcons {
        width: 150px;
        height: 36px;
        display: flex;
        justify-content: space-between;

        .icon {
          width: 34px;
          height: 34px;
          display: flex;
          justify-content: center;
          align-items: center;
          font-size: 28px;
          cursor: pointer;

          .googleIcon {
            background-color: #fff;
            border-radius: 50%;
          }

          .instaIcon {
            color: #808080;
          }

          .githubIcon {
            color: #c3c3c3;
            border-radius: 50%;
          }
        }
      }
    }

    .line {
      display: block;
      background-color: #808080;
      max-width: 1150px;
      width: 100%;
      height: 1.5px;
      /* margin: 22px auto 25px; */
      margin: 30px auto 25px;
    }

    .copyright {
      font-size: 12px;
      text-align: center;
      color: #d7d7d7;
    }
  }
`;
