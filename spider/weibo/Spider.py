import csv
import json

import requests
from lxml import etree

headers = {
    "user-agent": "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/111.0.0.0 "
                  "Safari/537.36",
    "cookie": "SINAGLOBAL=9551435337052.799.1680615041641; "
              "SUBP=0033WrSXqPxfM725Ws9jqgMF55529P9D9W5UsQWzFS7rHN-kXpM6N5vH5JpX5KMhUgL"
              ".FoMRe05c1h5Neoe2dJLoI79c9g44wHYt; MEIQIA_TRACK_ID=2OJ8IuURwFva0DJ6mozzqnwM3oz; "
              "MEIQIA_VISIT_ID=2OJ8J36Xmd1SKDDAadIZw1L84sQ; UOR=,,127.0.0.1:5000; "
              "ULV=1681441632857:15:15:10:4023350887785.1333.1681441632840:1681388395751; ALF=1684383954; "
              "SSOLoginState=1681791956; "
              "SCF=Ap1xha1wDXEMROVsZPqkRYk02OfrzUpAyhNjiuEBCsrBKuLH9c2DGxqH1WOiQdOezRrrn_JqoDkITVQUySjk4LM.; "
              "SUB=_2A25JOmuEDeRhGeFG6FIX-C7LyT-IHXVqTtpMrDV8PUNbmtANLVjykW9NecZsSBYPq_p9uJdZw9lFdR1oVigWKhW3; "
              "XSRF-TOKEN=JPdIy8FFXU2L83UODiV43uJe; "
              "WBPSESS=qJtA5EKTVAmfo4ozVa9MnqvcR0zz7rHwqy8Cz3zSQ"
              "-fuYQI67cm_6vqyKlGjiP94F6hqvKXCIQqCypSb5EqFpjB9eq3oAbMXZsfmlqSMalJrtNbqD7Qb5uK-6cNuht_XqF4FyfVAOIncD"
              "-9kfhngRA=="
}


class Spider:
    def __init__(self):
        self.url = None

    def parse(self):
        resp = requests.get(self.url, headers=headers)
        resp.encoding = "utf-8"
        # print(resp.text)
        html = etree.HTML(resp.text)
        return html

    def parse_json(self):
        resp = requests.get(self.url, headers=headers)
        resp.encoding = "utf-8"
        return resp.json()

    @staticmethod
    def saveAsCSV(path, item_list, data):

        with open(path, "w", encoding="utf-8") as f:
            writer = csv.DictWriter(f, fieldnames=item_list)
            writer.writeheader()
            writer.writerows(data)  # 按行写入数据

    @staticmethod
    def saveAsJson(path, jData):
        try:
            with open(path, "w", encoding="utf-8") as f:
                jData = {"data": jData}
                json.dump(jData, f, ensure_ascii=False)
                print("Writing JSON-----")
        except Exception as e:
            print("Error On JSON：", e)
