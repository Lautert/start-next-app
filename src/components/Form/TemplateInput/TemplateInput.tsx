import React from "react";
import { humanize } from "@/utils/gereric.utils";
import Modal from "@/components/Composite/Modal";

export interface PropsTemplateInput {
    id?: string;
    name?: string;
    label?: string | false;
    classDiv?: string | false;
    classContainer?: string;
    icon?: string;
    onlyIcon?: boolean;
    error?: boolean;
    divProps?: React.HTMLAttributes<HTMLDivElement>;
    containerProps?: React.HTMLAttributes<HTMLDivElement>;
    disabled?: boolean;
    onIconClick?: () => void;
    help?: (() => void) | string;
}

interface StateTemplateInput {
    label: string;
    showHelper: boolean;
}

class TemplateInput extends React.Component<PropsTemplateInput, StateTemplateInput> {
    static defaultProps = {
        classDiv: 'col-12 col-md-8 col-xl-6',
        error: false,
        onlyIcon: false,
    };

    constructor(props: PropsTemplateInput) {
        super(props);

        this.state = {
            label: this.props.label ?
                (this.props.label === " " ? '\u00A0' : this.props.label) :
                humanize(this.props.name || ""),
            showHelper: false
        }
    }

    static getDerivedStateFromProps(props: PropsTemplateInput, state: StateTemplateInput) {
        if (state.label !== props.label) {
            return {
                label:
                    props.label ?
                        (props.label === " " ? '\u00A0' : props.label) :
                        humanize(props.name || "")
            }
        }
        return null;
    }

    // componentDidUpdate(prevProps: PropsTemplateInput, prevState: StateTemplateInput, snapshot: any) {
    // 	console.log(prevProps.label);
    // }

    render() {
        return (
            <div
                {...this.props.divProps}
                className={
                    'template_input ' +
                    (this.props.classDiv || "") +
                    (this.props.error ? ' error' : '') +
                    (!!this.props.icon ? ' with-icon' : '') +
                    (this.props.onlyIcon ? ' only-icon' : '') +
                    (this.props.disabled ? ' disabled' : '')
                }>
                {
                    (typeof this.props.label === "boolean" && this.props.label === false) ? null :
                        <div className="label">
                            <label htmlFor={this.props.id}>
                                {this.state.label}
                            </label>
                            {(typeof this.props.help === 'function') ?
                                <div className="help" onClick={this.props.help}>
                                    <i className="fa fa-question-circle"></i>
                                </div>
                                : null
                            }
                            {(typeof this.props.help === 'string') ?
                                <>
                                    <div className="help" onClick={() => this.setState({ showHelper: true })}>
                                        <i className="fa fa-question-circle"></i>
                                    </div>
                                    <Modal
                                        title={`${this.state.label}, ajuda!`}
                                        open={this.state.showHelper}
                                        bodyComponent={this.props.help}
                                        onClose={() => { this.setState({ showHelper: false }) }}
                                    />
                                </>
                                : null
                            }
                        </div>
                }
                <div
                    {...this.props.containerProps}
                    className={
                        "container " +
                        (this.props.classContainer ? this.props.classContainer : "")
                    }>
                    {this.props.children}
                    {this.props.icon ?
                        <span className={'icon' + (this.props.onIconClick ? ' pointer' : '')} onClick={this.props.onIconClick}>
                            <i className={'fa fa-' + this.props.icon} />
                        </span>
                        : ''}
                </div>
            </div>
        )
    }
}
export default TemplateInput;

