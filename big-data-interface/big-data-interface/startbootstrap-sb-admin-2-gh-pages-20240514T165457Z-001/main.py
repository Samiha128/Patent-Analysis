import pandas as pd 


df =pd.read_csv("D:\\startbootstrap-sb-admin-2-gh-pages-20240514T165457Z-001\\startbootstrap-sb-admin-2-gh-pages\\data.csv")


df.to_html("data.html")