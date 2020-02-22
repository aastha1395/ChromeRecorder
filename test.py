import requests

url = "https://richardwiseman.files.wordpress.com/2011/09/jokes1.pdf"
response = requests.get(url=url)
print(response.status_code)
