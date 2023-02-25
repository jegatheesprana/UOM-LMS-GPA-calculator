function get_gpa(grade) {
    var gpa = 0
    switch (grade) {
        case 'A+':
            gpa = 4.2
            break
        case 'A':
            gpa = 4;
            break
        case 'A-':
            gpa = 3.7;
            break
        case 'B+':
            gpa = 3.3;
            break
        case 'B':
            gpa = 3;
            break
        case 'B-':
            gpa = 2.7;
            break
        case 'C+':
            gpa = 2.3;
            break
        case 'C':
            gpa = 2.0;
            break
        case 'C-':
            gpa = 1.5;
            break
        case 'D':
            gpa = 1;
            break
        default:
            gpa = 0;
    }
    const gpa2 = grade === 'A+' ? 4 : gpa
    return [gpa, gpa2]
}

function calc_final_gpa(results) {
    const arr = Object.values(results).reduce((acc, cur) => {
        return [acc[0] + cur[0], acc[1] + (cur[0] * cur[1]), acc[2] + (cur[0] * cur[2])]
    }, [0, 0, 0])
    return [arr[1] / arr[0], arr[2] / arr[0]]
}

function addRow(key, value) {
    const tableEle = document.querySelector('table.Text_table')
    const dup = tableEle.children[0].childNodes[0].cloneNode(true)
    const tr = dup.childNodes[0].cloneNode(true)
    tr.setAttribute('colspan', 3)
    tr.childNodes[0].innerText = value
    dup.childNodes.item(0).setAttribute('colspan', 2)
    dup.childNodes[0].childNodes[0].innerText = key
    dup.appendChild(tr)
    tableEle.children[0].appendChild(dup)
}

function calc() {
    const tableEle = document.querySelector('table.Text_table')
    if (!tableEle) return console.log("Cannot find table")
    const results = {}
    tableEle.children[0].childNodes.forEach(tr => {
        if (tr.childNodes.length === 5) {
            const sub = tr.childNodes.item(0).innerText
            const grade = tr.childNodes.item(2).innerText
            const credits = Number(tr.childNodes.item(3).innerText) || 0
            if (grade !== "Pending" && credits) {
                const gpas = get_gpa(grade)
                results[sub] = [credits, ...gpas]
            }
        }
    })
    console.log(results)
    const [final_gpa, gpa_for_4] = calc_final_gpa(results)
    addRow("Final GPA for 4.2", final_gpa)
    addRow("Final GPA for 4.0", gpa_for_4)

    // chrome.browserAction.onClicked.addListener(function (tab) { alert('icon clicked') });
    // document.getElementById('calculator-gpa1').innerText = final_gpa
    // document.getElementById('calculator-gpa2').innerText = gpa_for_4
}


calc()