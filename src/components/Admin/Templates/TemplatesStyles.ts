import styled from 'styled-components';

export const TemplatesWrapper = styled.section`
    border-top: 1px solid #ccc;
    padding-top: 3rem;

    .aws-templates-info {
        display: flex;
        justify-content: space-between;

        .input-search {
            display: flex;
            align-items: center;
            gap: 1rem;
            max-width: 25rem;
            height: 4rem;
            background: ${props => props.theme.colors.white};
            padding: 0 1rem;

            input {
                border: none;
                outline: none;
                width: 100%;
                background: transparent;
            }
        }
    }

    .my-templates {
        margin: 3rem 0 2rem 0;
    }

    .template-page-title {
        font-size: clamp(2rem, 2.5vw, 2.5rem);
        font-weight: bolder;
        color: ${props => props.theme.colors.primary};
    }

    .list {
        display: grid;
        gap: 3rem;
        grid-template-columns: repeat(auto-fit, minmax(40rem, 1fr));
    }

    .template-card.aws {
        cursor: pointer;
    }

    .template-card {
        font-size: 1.2rem !important;
        height: 22rem;
        background: ${props => props.theme.colors.white};
        padding: 2rem;
        border-radius: 1rem;
        border: 3px solid ${props => props.theme.colors.white};
        transition: .5s;

        :hover {
            transition: .5s;
            transform: translateY(-0.5rem);
            border-color: ${props => props.theme.colors.primary};
        }

        .template-card-info {
            position: relative;
            display: flex;
            align-items: flex-start;
            justify-content: space-between;

            button {
                position: absolute;
                top: -4rem;
                right: -4rem;
                border: none;
                outline: none;
                font-size: 2rem;
                width: 3.5rem;
                height: 3.5rem;
                border-radius: 10rem;
                display: flex;
                align-items: center;
                justify-content: center;
                background: ${props => props.theme.colors.primary};

                svg {
                    color: ${props => props.theme.colors.white};
                }
            }
        }

        .template-name {
            font-size: 2rem;
            font-weight: 600;
            color: ${props => props.theme.colors.font};
            width: 25rem;
            word-break: break-all;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap; 
        }

        .template-date {
            font-size: 1.4rem;
        }

        .template-desc {
            margin: 2rem 0 3rem 0;
        }

        .template-status {
            font-size: 1.6rem;
            font-weight: 600;
        }

        ul {
            margin-top: 1.7rem;
        }

        ul li {
            font-size: 1.8rem;
            margin-bottom: 0.7rem;
            cursor: pointer;
            display: flex;
            align-items: center;
            gap: 0.4rem;
        }

        .btn-templates-options {
            position: relative;
            cursor: pointer;
        }

        .btn-templates-options:hover .template-options {
            display: flex;
        }

        .template-options {
            display: none;
        }

        .template-options {
            position: absolute;
            top: 100%;
            left: -100%;
            background: ${props => props.theme.colors.white};
            flex-direction: column;
            box-shadow: 0 10px 20px rgb(0, 0, 0, 0.07);

            span {
                font-size: 1.4rem;
                text-align: left;
                padding: 1rem 2rem;

                :hover {
                    cursor: pointer;
                    color: ${props => props.theme.colors.white};
                    background: ${props => props.theme.colors.primary};
                }
            }
        }
    }

    `;

export const ButtonLink = styled.a`
    position: absolute;
    z-index: 3;
    bottom: 4rem;
    right: 4rem;
    width: 6rem;
    height: 6rem;
    background: ${props => props.theme.colors.primary};
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 10rem;
    box-shadow: 0 10px 20px rgb(0, 0, 0, 0.1);
    cursor: pointer;

    svg {
        font-size: 4rem;
        color: ${props => props.theme.colors.white};
    }

`

export const TemplateListWrapper = styled.div`
    margin-bottom: 10rem;
`
export const ContentModalEdit = styled.div`
    form {
        display: flex;
        flex-direction: column;

        label {
            margin: 2rem 0 1rem 0;
            font-size: 1.8rem;
        }

        textarea,
        input {
            width: 100%;
            border: none;
            outline: none;
            padding: 2rem 1rem;
            background: #eee;
        }

        textarea {
            resize: none;
            height: 30rem;
            width: 100%;
        }

        select {
            padding: 1rem 0.5rem;
            background: #eee;
            width: fit-content;
            border: none;
            outline: none;
        }

        button {
            margin-top: 2rem;
            width: fit-content;
            padding: 1rem 2rem;
            border: none;
            outline: none;
            color: ${props => props.theme.colors.white};
            background: ${props => props.theme.colors.primary};
            cursor: pointer;
        }
    }
`