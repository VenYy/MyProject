import csv
import json
import re
from datetime import datetime

import pandas

with open("./files/tmp.json", "r", encoding="utf-8") as f:
    data = json.load(f)
    # print(len(data["data"]))
    resData = []
    dicData = {}
    for i in data["data"]:
        for j in i:
            try:
                attitudes_count = j["mblog"]["attitudes_count"]  # 点赞数
                comments_count = j["mblog"]["comments_count"]  # 评论数
                reposts_count = j["mblog"]["reposts_count"]  # 转发数
                try:
                    status_province = j["mblog"]["status_province"]  # 所在城市
                except Exception as e:
                    print(e)
                    status_province = "未知"

                text = j["mblog"]["text"]  # 内容
                res = re.findall(
                    "[\u3002\uff1b\uff0c\uff1a\u201c\u201d\uff08\uff09\u3001\uff1f\u300a\u300b\u4e00-\u9fa5]", text)
                result = ''.join(res).rstrip("全文")

                mid = j["mblog"]["mid"]  # 唯一ID
                detail_url = f"https://m.weibo.cn/detail/{mid}"
                screen_name = j["mblog"]["user"]["screen_name"]  # 博主昵称
                followers_count = j["mblog"]["user"]["followers_count"]  # 粉丝数

                topic_name = j["actionlog"]["ext"]  # 话题名称
                topic_name = "".join(re.findall("[\u4e00-\u9fa5]", topic_name))
                type = j["mblog"]["page_info"]["type"]  # 类型

                timeStamp = datetime.now().strftime("%Y-%m-%d %H:%M:%S")  # 时间

                resData.append({"mid": mid, "detail_url": detail_url,
                                "screen_name": screen_name, "followers_count": followers_count,
                                "status_province": status_province,
                                "type": type, "topic_name": topic_name,
                                "attitudes_count": attitudes_count, "comments_count": comments_count,
                                "reposts_count": reposts_count,
                                "text": result, "timeStamp": timeStamp})
            except Exception as e:
                print(e)

# print(resData)

def saveToCSV():
    with open("./files/topicDetail.csv", "w", encoding="utf-8") as f:
        writer = csv.DictWriter(f, fieldnames=["mid", "detail_url", "screen_name", "followers_count", "status_province", "type",
                                               "topic_name", "attitudes_count", "comments_count", "reposts_count", "text", "timeStamp"])

        writer.writeheader()
        writer.writerows(resData)


