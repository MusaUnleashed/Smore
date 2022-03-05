import random
import time
import collections

import numpy as np
import pandas as pd


def str_time_prop(start, end, time_format, prop):
    stime = time.mktime(time.strptime(start, time_format))
    etime = time.mktime(time.strptime(end, time_format))
    ptime = stime + prop * (etime - stime)
    return time.strftime(time_format, time.localtime(ptime))


def random_date(start, end, prop):
    return str_time_prop(start, end, '%d/%m/%Y', prop)


def birthday(number_of_people, number_of_iteration):
    birthdays = []
    for i in range(number_of_iteration):
        for j in range(number_of_people):
            x = random_date("01/01/2021", "01/01/2022", random.random())
            birthdays.append(x)

    same_birthdays = []
    for m in range(number_of_iteration):

        same_date = [item for item, count
                     in collections.Counter(birthdays[0 + 50 * m:50 + 50 * m]).items()
                     if count > 1]
        same_birthdays.append(same_date)
    same_birthdays = pd.DataFrame(same_birthdays)
    same_birthdays = same_birthdays.fillna(value=np.nan)
    return same_birthdays


if _name_ == '_main_':
    num_of_runs = 10
    n_23 = birthday(23, num_of_runs)
    print(n_23)
    n_23 = n_23.shape[1]
    print(n_23)

    pass