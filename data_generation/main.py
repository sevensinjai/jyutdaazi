import pycantonese
import os

if __name__ == "__main__":
    # read the files
    count = 1
    for file in os.listdir("./.data/input"):
        result = []
        with open("./.data/input/{}".format(file), "r") as f:
            for line in f:
                for word in line:
                    if word == "\n" or word == " ":
                        result[-1]["suffix"] = word
                        continue
                    if word == "":
                        continue
                    pingying = pycantonese.characters_to_jyutping(word)
                    pingying = pingying[0]
                    parsedPingying = pycantonese.parse_jyutping(pingying[1])

                    onset = parsedPingying[0].onset
                    final = parsedPingying[0].nucleus + parsedPingying[0].coda
                    tone = parsedPingying[0].tone
                    result.append(
                        {"initial": onset, "final": final, "word": word, "tone": tone}
                    )

        # dump to json with chinese character
        import json

        with open("./.data/output/{}.json".format(count), "w") as f:
            json.dump(result, f, ensure_ascii=False)
        count += 1
