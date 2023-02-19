import ora from 'ora'

export default function() {
    const spinner = ora().start('加载中')
    setTimeout(() => {
        spinner.stop()
    }, 4000)
}