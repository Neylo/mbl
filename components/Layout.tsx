import React, { useEffect, useState, createContext } from 'react'

import Head from 'next/head'
import Header from './Header/Header'
import Colors from '../constants/colors'
import Footer from './Footer'
import moment from 'moment'
import { getToken, setToken } from '../constants/auth'
import { userInterface } from '../constants/formatters/profileFormatter'

interface Props {
  children: JSX.Element[] | JSX.Element
}

export const AuthContext = createContext({ isAuth: false, currentUser: {} as userInterface, setAuthState: null });

function Layout({ children: pageContent }: Props) {
  moment.locale('ru');
  const [loaded, loadedSet] = useState(false)

  const [isAuth, isAuthSet] = useState(null)
  const [currentUser, currentUserSet] = useState({})

  const setAuthState = (userInfo) => {
    if (userInfo) {
      isAuthSet(true);
      currentUserSet(userInfo)
    } else {
      isAuthSet(false)
      currentUserSet({})
    }
  }
  useEffect(() => {
    const token = getToken();
    if (token) {
      setToken(token, setAuthState)
    } else {
      isAuthSet(false);
    }
    loadedSet(true);
  }, [])
  return (loaded
    ? <AuthContext.Provider
      value={{ isAuth, currentUser, setAuthState }} >
      <Head>
        <title>Молодежная бизнес лига</title>
        <meta
          name="viewport"
          content="initial-scale=1.0, width=device-width"
          key="viewport"
        />
      </Head>
      {/* global styles */}
      <style jsx global>{`
        html, body {
          overflow-x: hidden;
        }
              body,
              button {
                font-family: 'Montserrat', sans-serif;
                font-weight: 500;
                font-size: 1em;
                letter-spacing: 0.02em;
              }
              body,
              button,
              .button { color: ${Colors.TextCommon}; }
              button.full,
              .button.full {
                width: 100%;
              }
              button, .button {
                display: block;
                
                background-color: transparent;
                cursor: pointer;
                border: none;
              }
              button:not(.clear), .button {
                padding: 12px 28px;
                text-transform: uppercase;

                font-size: 0.875em;
                letter-spacing: 1px;

                border: 4px solid ${Colors.Primary};
                transition: background-color 0.3s ease-in-out;
              }
              button.primary:not(.clear),
              .button.primary {
                background-color: ${Colors.Primary};
                color: #fff;
              }
              .inverted { background-color: ${Colors.Primary}; color: #ffffff; }
              .inverted button:not(.clear),
              .inverted .button { 
                color: #ffffff;
                border-color: #ffffff;
                 }
              .inverted button.primary,
              .inverted .button.primary { 
                color: ${Colors.Primary};
                background-color: #ffffff;
                 }
              button:not(.clear):hover,
              .button:hover { background-color: rgba(0, 102, 198, 0.1); }
              button.primary:not(.clear):hover,
              .button.primary:hover { background-color: rgb(24, 113, 196); }
              .inverted button.primary:hover,
              .inverted .button.primary:hover { background-color: rgb(243, 243, 243); }
              .inverted button:hover,
              .inverted .button:hover { background-color: rgba(255, 255, 255, 0.1); }
              button:not(.clear):focus,
              .button:focus {
                background-color: rgba(0, 102, 198, 0.2);
                outline-color: #ffffff;
              }
              .inverted a:focus {
                outline-color: #ffffff
              };
              button.primary:not(.clear):focus,
              .button.primary:focus { background-color: rgb(42, 126, 204); }
              .inverted button.primary:focus,
              .inverted .button.primary:focus { background-color: rgb(226, 226, 226); }
              .inverted button:focus,
              .inverted .button:focus { background-color: rgba(255, 255, 255, 0.2) };
              a.button {
                display: inline-block;
              }
              a.clear {
                text-decoration: inherit;
                color: inherit;
              }
              a.clear:not(.button):hover {
                text-decoration: underline;
              }
              a.primary:not(.clear),
              .link.primary {
                color: ${Colors.Primary};
                text-decoration: unset;
              }
              a:not(.clear),
              .link {
                color: ${Colors.Acsent};
                text-decoration: unset;
              }
              .inverted a:not(.clear) {
                color: #ffffff;
              }
              .inverted a:not(.clear):hover {
                color: #ffffff;
                text-decoration-color: #ffffff;
              }
              a:not(.clear):hover {
                text-decoration: underline;
                text-decoration-color: #c6e407;
                color: #c6e407;
              }
              a.primary:not(.clear):hover,
              .link.primary:hover {
                text-decoration: underline;
                text-decoration-color: #2676c0;
                color: #2676c0;
              }
              button[disabled] {
                background-color: rgb(214, 219, 219) !important;
                color: black !important;
              }
              h1,h2,h3,h4,h5,h6 {
                font-family: 'Montserrat', sans-serif;
                font-weight: 700;
              }
              h1 { font-size: 2.5em; } 
              h2 { font-size: 2em; }
              h3 { font-size: 1.625em; }
              .small {
                font-size: 0.75rem;
              }
              @media screen and (max-width: 576px) {
                body { font-size: 0.75em; }
                h1 { font-size: 1.25em; }
                h2 { font-size: 1.125em; }
                h3 { font-size: 1.125em; }
                button {
                  padding: 7px 10px;
                  border-width: 2px;
                }
                .small {
                  font-size: 0.625rem;
                }
              }
              .text,p {
                line-height: 2;
              }

              section { 
                position: relative;
                padding-top: 60px;
                padding-bottom: 60px;
              }
              @media screen and (max-width: 576px) {
                section {
                  padding-top: 25px;
                  padding-bottom: 25px;
                }
              }
              section.primary {background-color: ${Colors.Primary};}

              fieldset {
                border: none;
                padding: 0;
              }
              fieldset input {
                padding-top: 30px;
              }
              input {
                color: ${Colors.Primary};
                border: none;
                border-bottom: 2px solid ${Colors.Primary};
              }
              input:not([type="checkbox"]) {
                width: 100%;
              }
              input:hover,
              input:focus {border-bottom-color: ${Colors.Acsent}}
              input[data-error="true"] {
                border-bottom-color: red !important;
              }
              .label-text {
                font-weight: bold;
                font-size: 0.875em;
              }
              label > span {
                display: block;
              }
              @media screen and (max-width: 576px) {
                .m-align-center {
                  text-align: center;
                }
                fieldset input {
                  padding-top: 10px;
                }
                input {
                  color: ${Colors.Primary};
                  border: none;
                  border-bottom: 2px solid ${Colors.Primary};
                }
                .label-text {
                  font-size: 0.75rem;
                }
              }
              input:focus {
                outline: none;
              }

              .interactive {
                cursor: pointer;
              }

              img.responsive {
                width: 100%;
                height: auto;
                object-fit: cover;
              }

              .w-100 {
                width: 100%;
              }

              img,object {
                user-select: none;
                display: block;
              }
              
              .align-center {
                text-align: center;
              }
              .align-left {
                text-align: left;
              }
              .center {
                display: flex;
                align-items: center;
                justify-content: center;
              }
              .error {
                color: red;
                font-size: 0.625rem;
              }
            `}</style>
      {/* bootstrap spacings */}
      <style jsx global>{`        
            .m-0 {
              margin: 0 !important;
            }

            .mt-0,
            .my-0 {
              margin-top: 0 !important;
            }

            .mr-0,
            .mx-0 {
              margin-right: 0 !important;
            }

            .mb-0,
            .my-0 {
              margin-bottom: 0 !important;
            }

            .ml-0,
            .mx-0 {
              margin-left: 0 !important;
            }

            .m-1 {
              margin: 0.25rem !important;
            }

            .mt-1,
            .my-1 {
              margin-top: 0.25rem !important;
            }

            .mr-1,
            .mx-1 {
              margin-right: 0.25rem !important;
            }

            .mb-1,
            .my-1 {
              margin-bottom: 0.25rem !important;
            }

            .ml-1,
            .mx-1 {
              margin-left: 0.25rem !important;
            }

            .m-2 {
              margin: 0.5rem !important;
            }

            .mt-2,
            .my-2 {
              margin-top: 0.5rem !important;
            }

            .mr-2,
            .mx-2 {
              margin-right: 0.5rem !important;
            }

            .mb-2,
            .my-2 {
              margin-bottom: 0.5rem !important;
            }

            .ml-2,
            .mx-2 {
              margin-left: 0.5rem !important;
            }

            .m-3 {
              margin: 1rem !important;
            }

            .mt-3,
            .my-3 {
              margin-top: 1rem !important;
            }

            .mr-3,
            .mx-3 {
              margin-right: 1rem !important;
            }

            .mb-3,
            .my-3 {
              margin-bottom: 1rem !important;
            }

            .ml-3,
            .mx-3 {
              margin-left: 1rem !important;
            }

            .m-4 {
              margin: 1.5rem !important;
            }

            .mt-4,
            .my-4 {
              margin-top: 1.5rem !important;
            }

            .mr-4,
            .mx-4 {
              margin-right: 1.5rem !important;
            }

            .mb-4,
            .my-4 {
              margin-bottom: 1.5rem !important;
            }

            .ml-4,
            .mx-4 {
              margin-left: 1.5rem !important;
            }

            .m-5 {
              margin: 2.5rem !important;
            }

            .mt-5,
            .my-5 {
              margin-top: 2.5rem !important;
            }

            .mr-5,
            .mx-5 {
              margin-right: 2.5rem !important;
            }

            .mb-5,
            .my-5 {
              margin-bottom: 2.5rem !important;
            }

            .ml-5,
            .mx-5 {
              margin-left: 2.5rem !important;
            }

            .p-0 {
              padding: 0 !important;
            }

            .pt-0,
            .py-0 {
              padding-top: 0 !important;
            }

            .pr-0,
            .px-0 {
              padding-right: 0 !important;
            }

            .pb-0,
            .py-0 {
              padding-bottom: 0 !important;
            }

            .pl-0,
            .px-0 {
              padding-left: 0 !important;
            }

            .p-1 {
              padding: 0.25rem !important;
            }

            .pt-1,
            .py-1 {
              padding-top: 0.25rem !important;
            }

            .pr-1,
            .px-1 {
              padding-right: 0.25rem !important;
            }

            .pb-1,
            .py-1 {
              padding-bottom: 0.25rem !important;
            }

            .pl-1,
            .px-1 {
              padding-left: 0.25rem !important;
            }

            .p-2 {
              padding: 0.5rem !important;
            }

            .pt-2,
            .py-2 {
              padding-top: 0.5rem !important;
            }

            .pr-2,
            .px-2 {
              padding-right: 0.5rem !important;
            }

            .pb-2,
            .py-2 {
              padding-bottom: 0.5rem !important;
            }

            .pl-2,
            .px-2 {
              padding-left: 0.5rem !important;
            }

            .p-3 {
              padding: 1rem !important;
            }

            .pt-3,
            .py-3 {
              padding-top: 1rem !important;
            }

            .pr-3,
            .px-3 {
              padding-right: 1rem !important;
            }

            .pb-3,
            .py-3 {
              padding-bottom: 1rem !important;
            }

            .pl-3,
            .px-3 {
              padding-left: 1rem !important;
            }

            .p-4 {
              padding: 1.5rem !important;
            }

            .pt-4,
            .py-4 {
              padding-top: 1.5rem !important;
            }

            .pr-4,
            .px-4 {
              padding-right: 1.5rem !important;
            }

            .pb-4,
            .py-4 {
              padding-bottom: 1.5rem !important;
            }

            .pl-4,
            .px-4 {
              padding-left: 1.5rem !important;
            }

            .p-5 {
              padding: 2.5rem !important;
            }

            .pt-5,
            .py-5 {
              padding-top: 2.5rem !important;
            }

            .pr-5,
            .px-5 {
              padding-right: 2.5rem !important;
            }

            .pb-5,
            .py-5 {
              padding-bottom: 2.5rem !important;
            }

            .pl-5,
            .px-5 {
              padding-left: 2.5rem !important;
            }

            .m-auto {
              margin: auto !important;
            }

            .mt-auto,
            .my-auto {
              margin-top: auto !important;
            }

            .mr-auto,
            .mx-auto {
              margin-right: auto !important;
            }

            .mb-auto,
            .my-auto {
              margin-bottom: auto !important;
            }

            .ml-auto,
            .mx-auto {
              margin-left: auto !important;
            }

            @media (min-width: 576px) {
              .m-sm-0 {
                margin: 0 !important;
              }
              .mt-sm-0,
              .my-sm-0 {
                margin-top: 0 !important;
              }
              .mr-sm-0,
              .mx-sm-0 {
                margin-right: 0 !important;
              }
              .mb-sm-0,
              .my-sm-0 {
                margin-bottom: 0 !important;
              }
              .ml-sm-0,
              .mx-sm-0 {
                margin-left: 0 !important;
              }
              .m-sm-1 {
                margin: 0.25rem !important;
              }
              .mt-sm-1,
              .my-sm-1 {
                margin-top: 0.25rem !important;
              }
              .mr-sm-1,
              .mx-sm-1 {
                margin-right: 0.25rem !important;
              }
              .mb-sm-1,
              .my-sm-1 {
                margin-bottom: 0.25rem !important;
              }
              .ml-sm-1,
              .mx-sm-1 {
                margin-left: 0.25rem !important;
              }
              .m-sm-2 {
                margin: 0.5rem !important;
              }
              .mt-sm-2,
              .my-sm-2 {
                margin-top: 0.5rem !important;
              }
              .mr-sm-2,
              .mx-sm-2 {
                margin-right: 0.5rem !important;
              }
              .mb-sm-2,
              .my-sm-2 {
                margin-bottom: 0.5rem !important;
              }
              .ml-sm-2,
              .mx-sm-2 {
                margin-left: 0.5rem !important;
              }
              .m-sm-3 {
                margin: 1rem !important;
              }
              .mt-sm-3,
              .my-sm-3 {
                margin-top: 1rem !important;
              }
              .mr-sm-3,
              .mx-sm-3 {
                margin-right: 1rem !important;
              }
              .mb-sm-3,
              .my-sm-3 {
                margin-bottom: 1rem !important;
              }
              .ml-sm-3,
              .mx-sm-3 {
                margin-left: 1rem !important;
              }
              .m-sm-4 {
                margin: 1.5rem !important;
              }
              .mt-sm-4,
              .my-sm-4 {
                margin-top: 1.5rem !important;
              }
              .mr-sm-4,
              .mx-sm-4 {
                margin-right: 1.5rem !important;
              }
              .mb-sm-4,
              .my-sm-4 {
                margin-bottom: 1.5rem !important;
              }
              .ml-sm-4,
              .mx-sm-4 {
                margin-left: 1.5rem !important;
              }
              .m-sm-5 {
                margin: 2.5rem !important;
              }
              .mt-sm-5,
              .my-sm-5 {
                margin-top: 2.5rem !important;
              }
              .mr-sm-5,
              .mx-sm-5 {
                margin-right: 2.5rem !important;
              }
              .mb-sm-5,
              .my-sm-5 {
                margin-bottom: 2.5rem !important;
              }
              .ml-sm-5,
              .mx-sm-5 {
                margin-left: 2.5rem !important;
              }
              .p-sm-0 {
                padding: 0 !important;
              }
              .pt-sm-0,
              .py-sm-0 {
                padding-top: 0 !important;
              }
              .pr-sm-0,
              .px-sm-0 {
                padding-right: 0 !important;
              }
              .pb-sm-0,
              .py-sm-0 {
                padding-bottom: 0 !important;
              }
              .pl-sm-0,
              .px-sm-0 {
                padding-left: 0 !important;
              }
              .p-sm-1 {
                padding: 0.25rem !important;
              }
              .pt-sm-1,
              .py-sm-1 {
                padding-top: 0.25rem !important;
              }
              .pr-sm-1,
              .px-sm-1 {
                padding-right: 0.25rem !important;
              }
              .pb-sm-1,
              .py-sm-1 {
                padding-bottom: 0.25rem !important;
              }
              .pl-sm-1,
              .px-sm-1 {
                padding-left: 0.25rem !important;
              }
              .p-sm-2 {
                padding: 0.5rem !important;
              }
              .pt-sm-2,
              .py-sm-2 {
                padding-top: 0.5rem !important;
              }
              .pr-sm-2,
              .px-sm-2 {
                padding-right: 0.5rem !important;
              }
              .pb-sm-2,
              .py-sm-2 {
                padding-bottom: 0.5rem !important;
              }
              .pl-sm-2,
              .px-sm-2 {
                padding-left: 0.5rem !important;
              }
              .p-sm-3 {
                padding: 1rem !important;
              }
              .pt-sm-3,
              .py-sm-3 {
                padding-top: 1rem !important;
              }
              .pr-sm-3,
              .px-sm-3 {
                padding-right: 1rem !important;
              }
              .pb-sm-3,
              .py-sm-3 {
                padding-bottom: 1rem !important;
              }
              .pl-sm-3,
              .px-sm-3 {
                padding-left: 1rem !important;
              }
              .p-sm-4 {
                padding: 1.5rem !important;
              }
              .pt-sm-4,
              .py-sm-4 {
                padding-top: 1.5rem !important;
              }
              .pr-sm-4,
              .px-sm-4 {
                padding-right: 1.5rem !important;
              }
              .pb-sm-4,
              .py-sm-4 {
                padding-bottom: 1.5rem !important;
              }
              .pl-sm-4,
              .px-sm-4 {
                padding-left: 1.5rem !important;
              }
              .p-sm-5 {
                padding: 2.5rem !important;
              }
              .pt-sm-5,
              .py-sm-5 {
                padding-top: 2.5rem !important;
              }
              .pr-sm-5,
              .px-sm-5 {
                padding-right: 2.5rem !important;
              }
              .pb-sm-5,
              .py-sm-5 {
                padding-bottom: 2.5rem !important;
              }
              .pl-sm-5,
              .px-sm-5 {
                padding-left: 2.5rem !important;
              }
              .m-sm-auto {
                margin: auto !important;
              }
              .mt-sm-auto,
              .my-sm-auto {
                margin-top: auto !important;
              }
              .mr-sm-auto,
              .mx-sm-auto {
                margin-right: auto !important;
              }
              .mb-sm-auto,
              .my-sm-auto {
                margin-bottom: auto !important;
              }
              .ml-sm-auto,
              .mx-sm-auto {
                margin-left: auto !important;
              }
            }

            @media (min-width: 768px) {
              .m-md-0 {
                margin: 0 !important;
              }
              .mt-md-0,
              .my-md-0 {
                margin-top: 0 !important;
              }
              .mr-md-0,
              .mx-md-0 {
                margin-right: 0 !important;
              }
              .mb-md-0,
              .my-md-0 {
                margin-bottom: 0 !important;
              }
              .ml-md-0,
              .mx-md-0 {
                margin-left: 0 !important;
              }
              .m-md-1 {
                margin: 0.25rem !important;
              }
              .mt-md-1,
              .my-md-1 {
                margin-top: 0.25rem !important;
              }
              .mr-md-1,
              .mx-md-1 {
                margin-right: 0.25rem !important;
              }
              .mb-md-1,
              .my-md-1 {
                margin-bottom: 0.25rem !important;
              }
              .ml-md-1,
              .mx-md-1 {
                margin-left: 0.25rem !important;
              }
              .m-md-2 {
                margin: 0.5rem !important;
              }
              .mt-md-2,
              .my-md-2 {
                margin-top: 0.5rem !important;
              }
              .mr-md-2,
              .mx-md-2 {
                margin-right: 0.5rem !important;
              }
              .mb-md-2,
              .my-md-2 {
                margin-bottom: 0.5rem !important;
              }
              .ml-md-2,
              .mx-md-2 {
                margin-left: 0.5rem !important;
              }
              .m-md-3 {
                margin: 1rem !important;
              }
              .mt-md-3,
              .my-md-3 {
                margin-top: 1rem !important;
              }
              .mr-md-3,
              .mx-md-3 {
                margin-right: 1rem !important;
              }
              .mb-md-3,
              .my-md-3 {
                margin-bottom: 1rem !important;
              }
              .ml-md-3,
              .mx-md-3 {
                margin-left: 1rem !important;
              }
              .m-md-4 {
                margin: 1.5rem !important;
              }
              .mt-md-4,
              .my-md-4 {
                margin-top: 1.5rem !important;
              }
              .mr-md-4,
              .mx-md-4 {
                margin-right: 1.5rem !important;
              }
              .mb-md-4,
              .my-md-4 {
                margin-bottom: 1.5rem !important;
              }
              .ml-md-4,
              .mx-md-4 {
                margin-left: 1.5rem !important;
              }
              .m-md-5 {
                margin: 2.5rem !important;
              }
              .mt-md-5,
              .my-md-5 {
                margin-top: 2.5rem !important;
              }
              .mr-md-5,
              .mx-md-5 {
                margin-right: 2.5rem !important;
              }
              .mb-md-5,
              .my-md-5 {
                margin-bottom: 2.5rem !important;
              }
              .ml-md-5,
              .mx-md-5 {
                margin-left: 2.5rem !important;
              }
              .p-md-0 {
                padding: 0 !important;
              }
              .pt-md-0,
              .py-md-0 {
                padding-top: 0 !important;
              }
              .pr-md-0,
              .px-md-0 {
                padding-right: 0 !important;
              }
              .pb-md-0,
              .py-md-0 {
                padding-bottom: 0 !important;
              }
              .pl-md-0,
              .px-md-0 {
                padding-left: 0 !important;
              }
              .p-md-1 {
                padding: 0.25rem !important;
              }
              .pt-md-1,
              .py-md-1 {
                padding-top: 0.25rem !important;
              }
              .pr-md-1,
              .px-md-1 {
                padding-right: 0.25rem !important;
              }
              .pb-md-1,
              .py-md-1 {
                padding-bottom: 0.25rem !important;
              }
              .pl-md-1,
              .px-md-1 {
                padding-left: 0.25rem !important;
              }
              .p-md-2 {
                padding: 0.5rem !important;
              }
              .pt-md-2,
              .py-md-2 {
                padding-top: 0.5rem !important;
              }
              .pr-md-2,
              .px-md-2 {
                padding-right: 0.5rem !important;
              }
              .pb-md-2,
              .py-md-2 {
                padding-bottom: 0.5rem !important;
              }
              .pl-md-2,
              .px-md-2 {
                padding-left: 0.5rem !important;
              }
              .p-md-3 {
                padding: 1rem !important;
              }
              .pt-md-3,
              .py-md-3 {
                padding-top: 1rem !important;
              }
              .pr-md-3,
              .px-md-3 {
                padding-right: 1rem !important;
              }
              .pb-md-3,
              .py-md-3 {
                padding-bottom: 1rem !important;
              }
              .pl-md-3,
              .px-md-3 {
                padding-left: 1rem !important;
              }
              .p-md-4 {
                padding: 1.5rem !important;
              }
              .pt-md-4,
              .py-md-4 {
                padding-top: 1.5rem !important;
              }
              .pr-md-4,
              .px-md-4 {
                padding-right: 1.5rem !important;
              }
              .pb-md-4,
              .py-md-4 {
                padding-bottom: 1.5rem !important;
              }
              .pl-md-4,
              .px-md-4 {
                padding-left: 1.5rem !important;
              }
              .p-md-5 {
                padding: 2.5rem !important;
              }
              .pt-md-5,
              .py-md-5 {
                padding-top: 2.5rem !important;
              }
              .pr-md-5,
              .px-md-5 {
                padding-right: 2.5rem !important;
              }
              .pb-md-5,
              .py-md-5 {
                padding-bottom: 2.5rem !important;
              }
              .pl-md-5,
              .px-md-5 {
                padding-left: 2.5rem !important;
              }
              .m-md-auto {
                margin: auto !important;
              }
              .mt-md-auto,
              .my-md-auto {
                margin-top: auto !important;
              }
              .mr-md-auto,
              .mx-md-auto {
                margin-right: auto !important;
              }
              .mb-md-auto,
              .my-md-auto {
                margin-bottom: auto !important;
              }
              .ml-md-auto,
              .mx-md-auto {
                margin-left: auto !important;
              }
            }

            @media (min-width: 992px) {
              .m-lg-0 {
                margin: 0 !important;
              }
              .mt-lg-0,
              .my-lg-0 {
                margin-top: 0 !important;
              }
              .mr-lg-0,
              .mx-lg-0 {
                margin-right: 0 !important;
              }
              .mb-lg-0,
              .my-lg-0 {
                margin-bottom: 0 !important;
              }
              .ml-lg-0,
              .mx-lg-0 {
                margin-left: 0 !important;
              }
              .m-lg-1 {
                margin: 0.25rem !important;
              }
              .mt-lg-1,
              .my-lg-1 {
                margin-top: 0.25rem !important;
              }
              .mr-lg-1,
              .mx-lg-1 {
                margin-right: 0.25rem !important;
              }
              .mb-lg-1,
              .my-lg-1 {
                margin-bottom: 0.25rem !important;
              }
              .ml-lg-1,
              .mx-lg-1 {
                margin-left: 0.25rem !important;
              }
              .m-lg-2 {
                margin: 0.5rem !important;
              }
              .mt-lg-2,
              .my-lg-2 {
                margin-top: 0.5rem !important;
              }
              .mr-lg-2,
              .mx-lg-2 {
                margin-right: 0.5rem !important;
              }
              .mb-lg-2,
              .my-lg-2 {
                margin-bottom: 0.5rem !important;
              }
              .ml-lg-2,
              .mx-lg-2 {
                margin-left: 0.5rem !important;
              }
              .m-lg-3 {
                margin: 1rem !important;
              }
              .mt-lg-3,
              .my-lg-3 {
                margin-top: 1rem !important;
              }
              .mr-lg-3,
              .mx-lg-3 {
                margin-right: 1rem !important;
              }
              .mb-lg-3,
              .my-lg-3 {
                margin-bottom: 1rem !important;
              }
              .ml-lg-3,
              .mx-lg-3 {
                margin-left: 1rem !important;
              }
              .m-lg-4 {
                margin: 1.5rem !important;
              }
              .mt-lg-4,
              .my-lg-4 {
                margin-top: 1.5rem !important;
              }
              .mr-lg-4,
              .mx-lg-4 {
                margin-right: 1.5rem !important;
              }
              .mb-lg-4,
              .my-lg-4 {
                margin-bottom: 1.5rem !important;
              }
              .ml-lg-4,
              .mx-lg-4 {
                margin-left: 1.5rem !important;
              }
              .m-lg-5 {
                margin: 2.5rem !important;
              }
              .mt-lg-5,
              .my-lg-5 {
                margin-top: 2.5rem !important;
              }
              .mr-lg-5,
              .mx-lg-5 {
                margin-right: 2.5rem !important;
              }
              .mb-lg-5,
              .my-lg-5 {
                margin-bottom: 2.5rem !important;
              }
              .ml-lg-5,
              .mx-lg-5 {
                margin-left: 2.5rem !important;
              }
              .p-lg-0 {
                padding: 0 !important;
              }
              .pt-lg-0,
              .py-lg-0 {
                padding-top: 0 !important;
              }
              .pr-lg-0,
              .px-lg-0 {
                padding-right: 0 !important;
              }
              .pb-lg-0,
              .py-lg-0 {
                padding-bottom: 0 !important;
              }
              .pl-lg-0,
              .px-lg-0 {
                padding-left: 0 !important;
              }
              .p-lg-1 {
                padding: 0.25rem !important;
              }
              .pt-lg-1,
              .py-lg-1 {
                padding-top: 0.25rem !important;
              }
              .pr-lg-1,
              .px-lg-1 {
                padding-right: 0.25rem !important;
              }
              .pb-lg-1,
              .py-lg-1 {
                padding-bottom: 0.25rem !important;
              }
              .pl-lg-1,
              .px-lg-1 {
                padding-left: 0.25rem !important;
              }
              .p-lg-2 {
                padding: 0.5rem !important;
              }
              .pt-lg-2,
              .py-lg-2 {
                padding-top: 0.5rem !important;
              }
              .pr-lg-2,
              .px-lg-2 {
                padding-right: 0.5rem !important;
              }
              .pb-lg-2,
              .py-lg-2 {
                padding-bottom: 0.5rem !important;
              }
              .pl-lg-2,
              .px-lg-2 {
                padding-left: 0.5rem !important;
              }
              .p-lg-3 {
                padding: 1rem !important;
              }
              .pt-lg-3,
              .py-lg-3 {
                padding-top: 1rem !important;
              }
              .pr-lg-3,
              .px-lg-3 {
                padding-right: 1rem !important;
              }
              .pb-lg-3,
              .py-lg-3 {
                padding-bottom: 1rem !important;
              }
              .pl-lg-3,
              .px-lg-3 {
                padding-left: 1rem !important;
              }
              .p-lg-4 {
                padding: 1.5rem !important;
              }
              .pt-lg-4,
              .py-lg-4 {
                padding-top: 1.5rem !important;
              }
              .pr-lg-4,
              .px-lg-4 {
                padding-right: 1.5rem !important;
              }
              .pb-lg-4,
              .py-lg-4 {
                padding-bottom: 1.5rem !important;
              }
              .pl-lg-4,
              .px-lg-4 {
                padding-left: 1.5rem !important;
              }
              .p-lg-5 {
                padding: 2.5rem !important;
              }
              .pt-lg-5,
              .py-lg-5 {
                padding-top: 2.5rem !important;
              }
              .pr-lg-5,
              .px-lg-5 {
                padding-right: 2.5rem !important;
              }
              .pb-lg-5,
              .py-lg-5 {
                padding-bottom: 2.5rem !important;
              }
              .pl-lg-5,
              .px-lg-5 {
                padding-left: 2.5rem !important;
              }
              .m-lg-auto {
                margin: auto !important;
              }
              .mt-lg-auto,
              .my-lg-auto {
                margin-top: auto !important;
              }
              .mr-lg-auto,
              .mx-lg-auto {
                margin-right: auto !important;
              }
              .mb-lg-auto,
              .my-lg-auto {
                margin-bottom: auto !important;
              }
              .ml-lg-auto,
              .mx-lg-auto {
                margin-left: auto !important;
              }
            }

            @media (min-width: 1200px) {
              .m-xl-0 {
                margin: 0 !important;
              }
              .mt-xl-0,
              .my-xl-0 {
                margin-top: 0 !important;
              }
              .mr-xl-0,
              .mx-xl-0 {
                margin-right: 0 !important;
              }
              .mb-xl-0,
              .my-xl-0 {
                margin-bottom: 0 !important;
              }
              .ml-xl-0,
              .mx-xl-0 {
                margin-left: 0 !important;
              }
              .m-xl-1 {
                margin: 0.25rem !important;
              }
              .mt-xl-1,
              .my-xl-1 {
                margin-top: 0.25rem !important;
              }
              .mr-xl-1,
              .mx-xl-1 {
                margin-right: 0.25rem !important;
              }
              .mb-xl-1,
              .my-xl-1 {
                margin-bottom: 0.25rem !important;
              }
              .ml-xl-1,
              .mx-xl-1 {
                margin-left: 0.25rem !important;
              }
              .m-xl-2 {
                margin: 0.5rem !important;
              }
              .mt-xl-2,
              .my-xl-2 {
                margin-top: 0.5rem !important;
              }
              .mr-xl-2,
              .mx-xl-2 {
                margin-right: 0.5rem !important;
              }
              .mb-xl-2,
              .my-xl-2 {
                margin-bottom: 0.5rem !important;
              }
              .ml-xl-2,
              .mx-xl-2 {
                margin-left: 0.5rem !important;
              }
              .m-xl-3 {
                margin: 1rem !important;
              }
              .mt-xl-3,
              .my-xl-3 {
                margin-top: 1rem !important;
              }
              .mr-xl-3,
              .mx-xl-3 {
                margin-right: 1rem !important;
              }
              .mb-xl-3,
              .my-xl-3 {
                margin-bottom: 1rem !important;
              }
              .ml-xl-3,
              .mx-xl-3 {
                margin-left: 1rem !important;
              }
              .m-xl-4 {
                margin: 1.5rem !important;
              }
              .mt-xl-4,
              .my-xl-4 {
                margin-top: 1.5rem !important;
              }
              .mr-xl-4,
              .mx-xl-4 {
                margin-right: 1.5rem !important;
              }
              .mb-xl-4,
              .my-xl-4 {
                margin-bottom: 1.5rem !important;
              }
              .ml-xl-4,
              .mx-xl-4 {
                margin-left: 1.5rem !important;
              }
              .m-xl-5 {
                margin: 2.5rem !important;
              }
              .mt-xl-5,
              .my-xl-5 {
                margin-top: 2.5rem !important;
              }
              .mr-xl-5,
              .mx-xl-5 {
                margin-right: 2.5rem !important;
              }
              .mb-xl-5,
              .my-xl-5 {
                margin-bottom: 2.5rem !important;
              }
              .ml-xl-5,
              .mx-xl-5 {
                margin-left: 2.5rem !important;
              }
              .p-xl-0 {
                padding: 0 !important;
              }
              .pt-xl-0,
              .py-xl-0 {
                padding-top: 0 !important;
              }
              .pr-xl-0,
              .px-xl-0 {
                padding-right: 0 !important;
              }
              .pb-xl-0,
              .py-xl-0 {
                padding-bottom: 0 !important;
              }
              .pl-xl-0,
              .px-xl-0 {
                padding-left: 0 !important;
              }
              .p-xl-1 {
                padding: 0.25rem !important;
              }
              .pt-xl-1,
              .py-xl-1 {
                padding-top: 0.25rem !important;
              }
              .pr-xl-1,
              .px-xl-1 {
                padding-right: 0.25rem !important;
              }
              .pb-xl-1,
              .py-xl-1 {
                padding-bottom: 0.25rem !important;
              }
              .pl-xl-1,
              .px-xl-1 {
                padding-left: 0.25rem !important;
              }
              .p-xl-2 {
                padding: 0.5rem !important;
              }
              .pt-xl-2,
              .py-xl-2 {
                padding-top: 0.5rem !important;
              }
              .pr-xl-2,
              .px-xl-2 {
                padding-right: 0.5rem !important;
              }
              .pb-xl-2,
              .py-xl-2 {
                padding-bottom: 0.5rem !important;
              }
              .pl-xl-2,
              .px-xl-2 {
                padding-left: 0.5rem !important;
              }
              .p-xl-3 {
                padding: 1rem !important;
              }
              .pt-xl-3,
              .py-xl-3 {
                padding-top: 1rem !important;
              }
              .pr-xl-3,
              .px-xl-3 {
                padding-right: 1rem !important;
              }
              .pb-xl-3,
              .py-xl-3 {
                padding-bottom: 1rem !important;
              }
              .pl-xl-3,
              .px-xl-3 {
                padding-left: 1rem !important;
              }
              .p-xl-4 {
                padding: 1.5rem !important;
              }
              .pt-xl-4,
              .py-xl-4 {
                padding-top: 1.5rem !important;
              }
              .pr-xl-4,
              .px-xl-4 {
                padding-right: 1.5rem !important;
              }
              .pb-xl-4,
              .py-xl-4 {
                padding-bottom: 1.5rem !important;
              }
              .pl-xl-4,
              .px-xl-4 {
                padding-left: 1.5rem !important;
              }
              .p-xl-5 {
                padding: 2.5rem !important;
              }
              .pt-xl-5,
              .py-xl-5 {
                padding-top: 2.5rem !important;
              }
              .pr-xl-5,
              .px-xl-5 {
                padding-right: 2.5rem !important;
              }
              .pb-xl-5,
              .py-xl-5 {
                padding-bottom: 2.5rem !important;
              }
              .pl-xl-5,
              .px-xl-5 {
                padding-left: 2.5rem !important;
              }
              .m-xl-auto {
                margin: auto !important;
              }
              .mt-xl-auto,
              .my-xl-auto {
                margin-top: auto !important;
              }
              .mr-xl-auto,
              .mx-xl-auto {
                margin-right: auto !important;
              }
              .mb-xl-auto,
              .my-xl-auto {
                margin-bottom: auto !important;
              }
              .ml-xl-auto,
              .mx-xl-auto {
                margin-left: auto !important;
              }
            }
  
            `}</style>

      <Header />

      <main>
        {pageContent}
      </main>

      <Footer />

      <style jsx>{`
          main {
            position: relative;
            min-height: 57vh;
            }
        `}</style>
    </AuthContext.Provider>
    : <>
      <Head>
        <title>Молодежная бизнес лига</title>
      </Head>
    </>
  )
}

export default Layout