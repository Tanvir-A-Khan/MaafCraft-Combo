import React from "react";

const Catalog = () => {
    return (
        <div className="md:mx-28 mx-4">
            <h1 className="text-3xl text-center my-4 uppercase font-bold mb-8 *hover:text-green-900 ">
                Catalog
            </h1>
            <div className="flex flex-col text-start mx-72 px-20 py-10 mb-28 *:mb-3 bg-slate-100 rounded *:bg-slate-200 *:p-2 *:rounded-sm" >
                <a
                    href="https://barc.portal.gov.bd/sites/default/files/files/barc.portal.gov.bd/page/f152389f_b9fa_4fa6_8cc2_148df01aed6d/2023-06-25-07-23-97982a5e7178e796cf550f598b845147.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:font-bold"
                >
                  📃  2020 Maafcraft Catalog
                </a>
                <a
                    href="https://barc.portal.gov.bd/sites/default/files/files/barc.portal.gov.bd/page/f152389f_b9fa_4fa6_8cc2_148df01aed6d/2023-06-25-07-23-97982a5e7178e796cf550f598b845147.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:font-bold"
                >
                   📃 2021 Maafcraft Catalog PDF
                </a>
                <a
                    href="https://barc.portal.gov.bd/sites/default/files/files/barc.portal.gov.bd/page/f152389f_b9fa_4fa6_8cc2_148df01aed6d/2023-06-25-07-23-97982a5e7178e796cf550f598b845147.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:font-bold"
                >
                  📃  2022 Maafcraft Catalog PDF
                </a>
                <a
                    href="https://barc.portal.gov.bd/sites/default/files/files/barc.portal.gov.bd/page/f152389f_b9fa_4fa6_8cc2_148df01aed6d/2023-06-25-07-23-97982a5e7178e796cf550f598b845147.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:font-bold"
                >
                  📃  2023 Maafcraft Catalog* Latest PDF
                </a>
            </div>
        </div>
    );
};

export default Catalog;
